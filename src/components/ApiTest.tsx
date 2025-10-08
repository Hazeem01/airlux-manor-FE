import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { subscribeToNewsletter, submitContactForm } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

const ApiTest: React.FC = () => {
  const [testing, setTesting] = useState(false);
  const { toast } = useToast();

  const testNewsletterSubscription = async () => {
    setTesting(true);
    try {
      const result = await subscribeToNewsletter({
        email: 'test@example.com',
        source: 'api-test'
      });

      if (result.success) {
        toast({
          title: "Newsletter Test Success!",
          description: "Newsletter subscription API is working correctly.",
          duration: 5000,
        });
      } else {
        toast({
          title: "Newsletter Test Failed",
          description: result.error || "API connection failed",
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      toast({
        title: "Newsletter Test Error",
        description: "Network error or API not available",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setTesting(false);
    }
  };

  const testContactForm = async () => {
    setTesting(true);
    try {
      const result = await submitContactForm({
        name: 'Test User',
        email: 'test@example.com',
        phone: '+2347086831671',
        subject: 'general',
        message: 'This is a test message from the API integration test.',
        source: 'api-test'
      });

      if (result.success) {
        toast({
          title: "Contact Form Test Success!",
          description: "Contact form API is working correctly.",
          duration: 5000,
        });
      } else {
        toast({
          title: "Contact Form Test Failed",
          description: result.error || "API connection failed",
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      toast({
        title: "Contact Form Test Error",
        description: "Network error or API not available",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 m-4">
      <h3 className="font-playfair text-xl font-bold text-gray-800 mb-4">
        API Integration Test
      </h3>
      <p className="font-inter text-gray-600 mb-4">
        Test your backend API integration. Make sure your backend is running and VITE_API_URL is set correctly.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={testNewsletterSubscription}
          disabled={testing}
          variant="luxury-outline"
          className="flex-1"
        >
          {testing ? 'Testing...' : 'Test Newsletter API'}
        </Button>
        
        <Button
          onClick={testContactForm}
          disabled={testing}
          variant="luxury-outline"
          className="flex-1"
        >
          {testing ? 'Testing...' : 'Test Contact API'}
        </Button>
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
        <p className="font-inter text-sm text-blue-800">
          <strong>Current API URL:</strong> {import.meta.env.VITE_API_URL || 'Not set'}
        </p>
        <p className="font-inter text-sm text-blue-800 mt-1">
          <strong>Full API URL:</strong> {import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : 'Not configured'}
        </p>
      </div>
    </div>
  );
};

export default ApiTest;
