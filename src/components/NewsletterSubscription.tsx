import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { subscribeToNewsletter, validateNewsletterEmail } from '@/lib/api';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface NewsletterSubscriptionProps {
  source?: string;
  className?: string;
  placeholder?: string;
  buttonText?: string;
  showSuccessMessage?: boolean;
}

const NewsletterSubscription: React.FC<NewsletterSubscriptionProps> = ({
  source = 'homepage',
  className = '',
  placeholder = 'Your email address',
  buttonText = 'Subscribe',
  showSuccessMessage = true,
}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setError('');
    
    // Validate email
    const validation = validateNewsletterEmail(email);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid email');
      return;
    }

    setIsLoading(true);

    try {
      const result = await subscribeToNewsletter({ email, source });

      if (result.success) {
        setIsSuccess(true);
        setEmail('');
        
        if (showSuccessMessage) {
          toast({
            title: "Successfully Subscribed!",
            description: result.message || "Thank you for subscribing to our newsletter.",
            duration: 5000,
          });
        }
      } else {
        setError(result.error || 'Failed to subscribe');
        toast({
          title: "Subscription Failed",
          description: result.error || "Please try again later.",
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      const errorMessage = 'Failed to subscribe. Please try again later.';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError(''); // Clear error when user starts typing
  };

  if (isSuccess && showSuccessMessage) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-6 text-center ${className}`}>
        <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
        <h3 className="font-playfair text-xl font-bold text-green-800 mb-2">
          Thank You for Subscribing!
        </h3>
        <p className="font-inter text-green-700">
          You'll receive exclusive property listings, market insights, and luxury real estate news.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder={placeholder}
            required
            disabled={isLoading}
            className={`font-inter ${
              error ? 'border-red-500 focus:ring-red-500' : 'focus:ring-luxury-gold'
            }`}
          />
          {error && (
            <div className="flex items-center mt-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 mr-2" />
              {error}
            </div>
          )}
        </div>
        <Button
          type="submit"
          variant="luxury"
          size="lg"
          disabled={isLoading || !email.trim()}
          className="whitespace-nowrap"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Subscribing...
            </>
          ) : (
            buttonText
          )}
        </Button>
      </div>
      
      <p className="text-xs text-gray-500 font-inter">
        By subscribing, you agree to receive marketing emails from Airlux Manor. 
        You can unsubscribe at any time.
      </p>
    </form>
  );
};

export default NewsletterSubscription;
