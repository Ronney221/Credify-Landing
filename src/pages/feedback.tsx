import { RootLayout } from '../components/layout/RootLayout';
import { FeedbackFormContent } from '../components/forms/FeedbackForm';

export default function FeedbackPage() {
  return (
    <RootLayout>
      <div className="min-h-screen py-24 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Submit Feedback</h1>
              <p className="mt-2 text-sm text-gray-600">
                Help us improve by reporting bugs or requesting new features.
              </p>
            </div>
            <FeedbackFormContent />
          </div>
        </div>
      </div>
    </RootLayout>
  );
} 