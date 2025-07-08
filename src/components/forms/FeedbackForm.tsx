import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { supabase } from '../../lib/supabase';

type FeedbackType = 'bug' | 'feature';

interface FeedbackFormProps {
  className?: string;
}

interface FileWithPreview extends File {
  preview?: string;
}

export function FeedbackFormContent() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('bug');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [screenshots, setScreenshots] = useState<FileWithPreview[]>([]);

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const newFiles = Array.from(e.target.files).map(file => {
      const preview = URL.createObjectURL(file);
      return Object.assign(file, { preview });
    });

    setScreenshots(prev => [...prev, ...newFiles]);
  };

  const removeScreenshot = (index: number) => {
    setScreenshots(prev => {
      const newScreenshots = [...prev];
      if (newScreenshots[index]?.preview) {
        URL.revokeObjectURL(newScreenshots[index].preview!);
      }
      newScreenshots.splice(index, 1);
      return newScreenshots;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // First, upload any screenshots
      const screenshotUrls = await Promise.all(
        screenshots.map(async (file) => {
          const fileName = `${Date.now()}-${file.name}`;
          const { data, error } = await supabase.storage
            .from('feedback-screenshots')
            .upload(fileName, file);

          if (error) throw error;

          // Get public URL
          const { data: { publicUrl } } = supabase.storage
            .from('feedback-screenshots')
            .getPublicUrl(fileName);

          return publicUrl;
        })
      );

      // Then submit the feedback with screenshot URLs
      const { error } = await supabase
        .from('feedback')
        .insert([
          {
            type: feedbackType,
            title,
            description,
            email: email || null,
            status: 'new',
            screenshots: screenshotUrls
          }
        ]);

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message);
      }
      
      setSubmitStatus('success');
      // Reset form
      setTitle('');
      setDescription('');
      setEmail('');
      setScreenshots([]);
      
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error 
          ? error.message 
          : 'Failed to submit feedback. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label>Type</Label>
        <div className="flex gap-4">
          <Button
            type="button"
            variant={feedbackType === 'bug' ? 'default' : 'outline'}
            onClick={() => setFeedbackType('bug')}
          >
            Bug Report
          </Button>
          <Button
            type="button"
            variant={feedbackType === 'feature' ? 'default' : 'outline'}
            onClick={() => setFeedbackType('feature')}
          >
            Feature Request
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={feedbackType === 'bug' ? 'Brief description of the bug' : 'Feature name'}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={
            feedbackType === 'bug'
              ? 'Steps to reproduce the bug and expected behavior'
              : 'Describe the feature and how it would be useful'
          }
          className="w-full min-h-[150px] px-3 py-2 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="screenshots">Screenshots</Label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md border-gray-300">
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
              >
                <span>Upload files</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  multiple
                  onChange={handleScreenshotChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>

        {/* Screenshot previews */}
        {screenshots.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {screenshots.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={file.preview}
                  alt={`Screenshot ${index + 1}`}
                  className="h-24 w-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeScreenshot(index)}
                  className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email (optional)</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="For follow-up questions"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
      </Button>

      {submitStatus === 'success' && (
        <p className="text-sm text-green-600 text-center">
          Thank you for your feedback!
        </p>
      )}
      {submitStatus === 'error' && (
        <p className="text-sm text-red-600 text-center">
          {errorMessage}
        </p>
      )}
    </form>
  );
}

export function FeedbackForm({ className }: FeedbackFormProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={className}>
          Report Bug / Request Feature
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Submit Feedback</DialogTitle>
        </DialogHeader>
        <FeedbackFormContent />
      </DialogContent>
    </Dialog>
  );
} 