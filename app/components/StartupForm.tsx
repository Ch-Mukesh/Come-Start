'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { formSchema } from '../lib/validation';
import { createPitch } from '../lib/actions';
import { z } from 'zod';

type FormState = {
  error?: string;
  fieldErrors?: {
    title?: string;
    description?: string;
    category?: string;
    link?: string;
    pitch?: string;
  };
  status: 'INITIAL' | 'SUCCESS' | 'ERROR';
  _id?: string;
  pitch?: string;
};

async function submitForm(state: FormState, formData: FormData): Promise<FormState> {
  try {
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      category: formData.get('category') as string,
      link: formData.get('link') as string,
      pitch: formData.get('pitch') as string || state.pitch || '',
    };

    console.log('Form Data:', data);
    
    await formSchema.parseAsync(data);
    
    const result = await createPitch(state, formData, data.pitch);
    return result;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldErrors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const field = err.path[0] as string;
        fieldErrors[field] = err.message;
      });
      
      return {
        status: 'ERROR',
        fieldErrors,
      };
    }
    
    return {
      status: 'ERROR',
      error: 'An unexpected error occurred',
    };
  }
}

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white py-5 px-8 rounded-xl hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 disabled:opacity-50 font-semibold text-lg shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]"
    >
      {pending ? 'Submitting...' : 'Submit Startup'}
    </button>
  );
}

const inputStyles = "mt-1 block w-full rounded-xl bg-gray-900/30 border border-gray-800/50 text-white shadow-[0_0_10px_rgba(0,0,0,0.3)] focus:border-purple-500/50 focus:ring-purple-500/50 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 transition-all duration-200 placeholder-gray-500 hover:bg-gray-900/40 hover:border-gray-700/50 focus:bg-gray-900/50 backdrop-blur-sm py-4 px-5 text-base";

export default function StartupForm() {
  const router = useRouter();
  const initialState: FormState = { status: 'INITIAL' };
  const [state, formAction] = useActionState(submitForm, initialState);
  const [pitch, setPitch] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageError, setImageError] = useState<string>('');

  useEffect(() => {
    if (state.status === 'SUCCESS' && state._id) {
      router.push(`/startup/${state._id}`);
    }
  }, [state.status, state._id, router]);

  const validateImageUrl = async (url: string) => {
    if (!url) {
      setImageError('');
      return;
    }

    try {
      setIsImageLoading(true);
      setImageError('');
      
      const res = await fetch(url, { method: 'HEAD' });
      const contentType = res.headers.get('content-type');
      
      if (!contentType?.startsWith('image/')) {
        setImageError('The URL must point to a valid image file (jpg, png, gif, etc.)');
      }
    } catch (error) {
      setImageError('Unable to verify image URL. Please check if the URL is accessible.');
    } finally {
      setIsImageLoading(false);
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImageUrl(url);
    validateImageUrl(url);
  };

  const ErrorMessage = ({ message }: { message?: string }) => {
    if (!message) return null;
    return (
      <div className="mt-2 text-sm text-red-400/90 flex items-center gap-2 animate-fadeIn">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {message}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-10 bg-gradient-to-br from-gray-950/80 via-black/80 to-gray-950/80 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-gray-800/50 backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-indigo-500/5 rounded-2xl pointer-events-none" />
      <h2 className="text-4xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 pb-2 border-b border-gray-800/50">Create Your Startup</h2>
      
      {state.error && !state.fieldErrors && (
        <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
          {state.error}
        </div>
      )}
      
      <form action={formAction} className="space-y-10 relative">
        <div className="group">
          <label htmlFor="title" className="block text-sm font-semibold text-gray-300 mb-3 group-hover:text-purple-300 transition-colors duration-200">
            Startup Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter your startup name"
            className={`${inputStyles} ${state.fieldErrors?.title ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/50' : ''}`}
            required
            minLength={3}
            maxLength={100}
          />
          <ErrorMessage message={state.fieldErrors?.title} />
        </div>

        <div className="group">
          <label htmlFor="category" className="block text-sm font-semibold text-gray-300 mb-3 group-hover:text-purple-300 transition-colors duration-200">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            placeholder="e.g., FinTech, HealthTech, AI"
            className={`${inputStyles} ${state.fieldErrors?.category ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/50' : ''}`}
            required
            minLength={3}
            maxLength={20}
          />
          <ErrorMessage message={state.fieldErrors?.category} />
        </div>

        <div className="group">
          <label htmlFor="description" className="block text-sm font-semibold text-gray-300 mb-3 group-hover:text-purple-300 transition-colors duration-200">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={5}
            placeholder="Describe your startup's mission and vision"
            className={`${inputStyles} ${state.fieldErrors?.description ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/50' : ''}`}
            required
            minLength={20}
            maxLength={500}
          />
          <ErrorMessage message={state.fieldErrors?.description} />
        </div>

        <div className="group">
          <label htmlFor="link" className="block text-sm font-semibold text-gray-300 mb-3 group-hover:text-purple-300 transition-colors duration-200">
            Image URL
          </label>
          <div className="space-y-4">
            <input
              type="url"
              id="link"
              name="link"
              value={imageUrl}
              onChange={handleImageUrlChange}
              placeholder="https://example.com/your-startup-image.jpg"
              className={`${inputStyles} ${(state.fieldErrors?.link || imageError) ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/50' : ''}`}
              required
            />
            {isImageLoading && (
              <div className="flex items-center gap-2 text-sm text-purple-400/80">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Verifying image URL...
              </div>
            )}
            {imageUrl && !isImageLoading && !imageError && (
              <div className="relative w-full h-48 rounded-xl overflow-hidden border border-gray-800/50 bg-gray-900/30">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={() => setImageError('Failed to load image. Please check the URL.')}
                />
              </div>
            )}
            <ErrorMessage message={imageError || state.fieldErrors?.link} />
          </div>
        </div>

        <div className="group">
          <label htmlFor="pitch" className="block text-sm font-semibold text-gray-300 mb-3 group-hover:text-purple-300 transition-colors duration-200">
            Elevator Pitch
          </label>
          <div data-color-mode="dark" className={`mt-1 ${state.fieldErrors?.pitch ? 'ring-2 ring-red-500/50 rounded-xl' : ''}`}>
            <MDEditor
              value={pitch}
              onChange={(value) => {
                setPitch(value || '');
                const pitchInput = document.querySelector('input[name="pitch"]') as HTMLInputElement;
                if (pitchInput) {
                  pitchInput.value = value || '';
                }
              }}
              preview="edit"
              height={300}
              className="!bg-gray-900/30 !border-gray-800/50 rounded-xl overflow-hidden"
              textareaProps={{
                placeholder: "Write your compelling pitch using markdown...",
                name: "pitch",
                required: true,
                minLength: 10,
              }}
            />
            <input type="hidden" name="pitch" value={pitch} />
          </div>
          <ErrorMessage message={state.fieldErrors?.pitch} />
        </div>

        <div className="pt-8">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
} 