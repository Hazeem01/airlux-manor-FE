import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm, validateForm, ContactFormData } from '@/lib/api';
import { Loader2, CheckCircle, AlertCircle, Send } from 'lucide-react';

interface ContactFormProps {
  source?: string;
  className?: string;
  showSuccessMessage?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({
  source = 'contact-page',
  className = '',
  showSuccessMessage = true,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, subject: value }));
    
    // Clear errors when user makes selection
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors([]);
    
    // Validate form
    const validation = validateForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsLoading(true);

    try {
      const result = await submitContactForm({ ...formData, source });

      if (result.success) {
        setIsSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
        
        if (showSuccessMessage) {
          toast({
            title: "Message Sent Successfully!",
            description: result.message || "Thank you for your message. We'll get back to you soon.",
            duration: 5000,
          });
        }
      } else {
        setErrors([result.error || 'Failed to send message']);
        toast({
          title: "Failed to Send Message",
          description: result.error || "Please try again later.",
          variant: "destructive",
          duration: 5000,
        });
      }
    } catch (error) {
      const errorMessage = 'Failed to send message. Please try again later.';
      setErrors([errorMessage]);
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

  if (isSuccess && showSuccessMessage) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-8 text-center ${className}`}>
        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h3 className="font-playfair text-2xl font-bold text-green-800 mb-3">
          Message Sent Successfully!
        </h3>
        <p className="font-inter text-green-700 mb-4">
          Thank you for contacting Airlux Manor. We've received your message and will get back to you within 24 hours.
        </p>
        <Button
          variant="luxury-outline"
          onClick={() => setIsSuccess(false)}
          className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block font-inter text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            disabled={isLoading}
            className="font-inter"
            placeholder="John Doe"
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block font-inter text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            disabled={isLoading}
            className="font-inter"
            placeholder="john@example.com"
          />
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block font-inter text-sm font-medium text-gray-700 mb-2">
            Phone Number (Optional)
          </label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            disabled={isLoading}
            className="font-inter"
            placeholder="09012345678 or +2349012345678"
          />
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block font-inter text-sm font-medium text-gray-700 mb-2">
            Subject *
          </label>
          <Select value={formData.subject} onValueChange={handleSelectChange} disabled={isLoading}>
            <SelectTrigger className="font-inter">
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="property-inquiry">Property Inquiry</SelectItem>
              <SelectItem value="investment">Investment Opportunity</SelectItem>
              <SelectItem value="general">General Question</SelectItem>
              <SelectItem value="partnership">Partnership</SelectItem>
              <SelectItem value="property-management">Property Management</SelectItem>
              <SelectItem value="valuation">Property Valuation</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block font-inter text-sm font-medium text-gray-700 mb-2">
          Message *
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          required
          disabled={isLoading}
          rows={5}
          className="font-inter resize-none"
          placeholder="Tell us about your requirements, questions, or how we can help you..."
        />
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-inter font-medium text-red-800 mb-2">Please fix the following errors:</h4>
              <ul className="list-disc list-inside space-y-1">
                {errors.map((error, index) => (
                  <li key={index} className="font-inter text-sm text-red-700">{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        variant="luxury"
        size="lg"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Sending Message...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Send Message
          </>
        )}
      </Button>

      <p className="text-xs text-gray-500 font-inter text-center">
        By submitting this form, you agree to our privacy policy. We'll use your information to respond to your inquiry.
      </p>
    </form>
  );
};

export default ContactForm;
