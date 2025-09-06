import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import Modal from '@/components/atoms/Modal';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import { getPricingPackages, purchaseCredits } from '@/services/api/pricingService';

const PricingModal = ({ isOpen, onClose }) => {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [error, setError] = useState(null);
  
  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isOpen) {
      loadPricingPackages();
    }
  }, [isOpen]);

  const loadPricingPackages = async () => {
    setLoading(true);
    setError(null);
    try {
      const packagesData = await getPricingPackages();
      setPackages(packagesData);
    } catch (err) {
      setError('Failed to load pricing packages. Please try again.');
      console.error('Error loading pricing packages:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
  };

  const handlePurchase = async () => {
    if (!selectedPackage) {
      toast.error('Please select a package first.');
      return;
    }

    if (!isAuthenticated || !user?.userId) {
      toast.error('Please log in to purchase credits.');
      return;
    }

    setPurchasing(true);
    try {
      const result = await purchaseCredits(selectedPackage, user.userId);
      
      if (result.success) {
        toast.success(result.message);
        onClose();
        setSelectedPackage(null);
      } else {
        toast.error('Purchase failed. Please try again.');
      }
    } catch (err) {
      toast.error(err.message || 'Purchase failed. Please try again.');
      console.error('Purchase error:', err);
    } finally {
      setPurchasing(false);
    }
  };

  const handleRetry = () => {
    loadPricingPackages();
  };

  if (loading) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} className="max-w-md">
        <div className="p-8">
          <Loading />
        </div>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} className="max-w-md">
        <div className="p-8">
          <Error message={error} onRetry={handleRetry} />
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-4xl">
      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold dark:text-white light:text-purple-900 mb-2">
            Choose Your Credit Package
          </h2>
          <p className="dark:text-gray-300 light:text-purple-700 text-lg">
            Select the perfect package for your content creation needs
          </p>
        </div>

        {/* Pricing Packages */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.Id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <Card 
                className={`h-full cursor-pointer transition-all duration-200 ${
                  selectedPackage?.Id === pkg.Id
                    ? 'ring-2 ring-primary-500 dark:bg-primary-900/20 light:bg-primary-50'
                    : 'hover:ring-1 hover:ring-primary-400/50'
                } ${pkg.popular ? 'border-primary-500/50' : ''}`}
                onClick={() => handlePackageSelect(pkg)}
              >
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-xl mb-2">
                    {pkg.Name || `${pkg.quantity_c} Credits`}
                  </CardTitle>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold text-primary-400">
                      ${pkg.price_c}
                    </div>
                    <div className="text-sm dark:text-gray-400 light:text-purple-600">
                      {pkg.quantity_c} credits
                    </div>
                    <div className="text-xs dark:text-gray-500 light:text-purple-500">
                      ${(pkg.price_c / pkg.quantity_c).toFixed(3)} per credit
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <ApperIcon name="Check" className="h-4 w-4 text-green-400" />
                      <span className="dark:text-gray-300 light:text-purple-700">
                        {pkg.quantity_c} AI generations
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <ApperIcon name="Check" className="h-4 w-4 text-green-400" />
                      <span className="dark:text-gray-300 light:text-purple-700">
                        All content types
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <ApperIcon name="Check" className="h-4 w-4 text-green-400" />
                      <span className="dark:text-gray-300 light:text-purple-700">
                        Instant delivery
                      </span>
                    </div>
                    {pkg.quantity_c >= 500 && (
                      <div className="flex items-center gap-2 text-sm">
                        <ApperIcon name="Star" className="h-4 w-4 text-yellow-400" />
                        <span className="dark:text-gray-300 light:text-purple-700">
                          Priority support
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {selectedPackage?.Id === pkg.Id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-4 flex items-center justify-center"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center">
                        <ApperIcon name="Check" className="h-5 w-5 text-white" />
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Purchase Section */}
        {selectedPackage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <div className="p-4 dark:bg-gray-800/50 light:bg-purple-50/50 rounded-lg border dark:border-gray-700/50 light:border-purple-200/50">
              <p className="dark:text-gray-300 light:text-purple-700 mb-2">
                You selected: <strong>{selectedPackage.Name || `${selectedPackage.quantity_c} Credits`}</strong>
              </p>
              <p className="text-2xl font-bold text-primary-400">
                ${selectedPackage.price_c}
              </p>
            </div>

            <div className="flex justify-center gap-4">
              <Button
                variant="secondary"
                onClick={() => setSelectedPackage(null)}
                disabled={purchasing}
              >
                Choose Different Package
              </Button>
              <Button
                onClick={handlePurchase}
                disabled={purchasing}
                className="min-w-[140px]"
              >
                {purchasing ? (
                  <>
                    <ApperIcon name="Loader" className="animate-spin h-4 w-4 mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <ApperIcon name="CreditCard" className="h-4 w-4 mr-2" />
                    Purchase Now
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Benefits */}
        <div className="mt-8 pt-6 border-t dark:border-gray-700/50 light:border-purple-200/50">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold dark:text-white light:text-purple-900">
              Why Choose Our Credits?
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <ApperIcon name="Zap" className="h-4 w-4 text-primary-400" />
                <span className="dark:text-gray-300 light:text-purple-700">
                  Instant activation
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Shield" className="h-4 w-4 text-green-400" />
                <span className="dark:text-gray-300 light:text-purple-700">
                  Secure payment
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Clock" className="h-4 w-4 text-blue-400" />
                <span className="dark:text-gray-300 light:text-purple-700">
                  Never expire
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PricingModal;