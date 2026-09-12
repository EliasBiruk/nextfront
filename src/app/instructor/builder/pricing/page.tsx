'use client';

import { Suspense } from 'react';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card, { CardBody, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { coursesService } from '@/services';
import { useAuth } from '@/context/AuthContext';

function CoursePricingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentUser } = useAuth();
  const courseId = searchParams.get('id');
  
  const [pricing, setPricing] = useState({
    price: 49.99,
    discountPrice: '',
    currency: 'USD',
    free: false,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadCourse() {
      if (!courseId || !currentUser) return;
      setIsLoading(true);
      try {
        const response = await coursesService().getCourseById({ courseId });
        setPricing({
          price: response.course.price || 49.99,
          discountPrice: '',
          currency: 'USD',
          free: response.course.price === 0,
        });
      } catch (error) {
        console.error('Failed to load course:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadCourse();
  }, [courseId, currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseId) return;
    
    setIsSaving(true);
    try {
      await coursesService().updateCourse({ 
        courseId, 
        price: pricing.free ? 0 : pricing.price,
      });
      router.push(`/instructor/builder/settings?id=${courseId}`);
    } catch (error) {
      console.error('Failed to save pricing:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout actor="instructor" userName="Dr. Smith" instructorType="joyedu">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Course Pricing</h1>
        <p className="text-gray-600">Set the price for your course</p>
      </div>

      <div className="max-w-2xl">
        <Card>
          <CardBody>
            <CardTitle>Pricing Settings</CardTitle>
            
            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  id="free"
                  checked={pricing.free}
                  onChange={(e) => setPricing({ ...pricing, free: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <label htmlFor="free" className="text-sm font-medium text-gray-700">
                  Make this course free
                </label>
              </div>

              {!pricing.free && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-2 text-gray-500">$</span>
                        <input
                          type="number"
                          required
                          step="0.01"
                          min="0"
                          value={pricing.price}
                          onChange={(e) => setPricing({ ...pricing, price: parseFloat(e.target.value) })}
                          className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="49.99"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Currency
                      </label>
                      <select
                        value={pricing.currency}
                        onChange={(e) => setPricing({ ...pricing, currency: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="CAD">CAD ($)</option>
                        <option value="AUD">AUD ($)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount Price (Optional)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">$</span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={pricing.discountPrice}
                        onChange={(e) => setPricing({ ...pricing, discountPrice: e.target.value })}
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="39.99"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Leave empty for no discount</p>
                  </div>
                </>
              )}

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Revenue Share</h4>
                <p className="text-sm text-gray-600">
                  You will receive <strong>70%</strong> of course sales after platform fees.
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save & Continue'}
                </button>
                <Link
                  href={`/instructor/builder/curriculum?id=${courseId}`}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
                >
                  Back to Curriculum
                </Link>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default function CoursePricing() {
  return (
    <Suspense fallback={<div>Loading pricing...</div>}>
      <CoursePricingContent />
    </Suspense>
  );
}