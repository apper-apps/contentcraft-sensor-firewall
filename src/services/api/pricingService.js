// Initialize ApperClient with Project ID and Public Key
const { ApperClient } = window.ApperSDK;
const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

// Pricing Packages Service - using price_c table
export const getPricingPackages = async () => {
  try {
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "quantity_c" } },
        { field: { Name: "price_c" } },
        { field: { Name: "credit_c" } }
      ],
      orderBy: [{ fieldName: "quantity_c", sorttype: "ASC" }],
      pagingInfo: { limit: 20, offset: 0 }
    };
    
    const response = await apperClient.fetchRecords('price_c', params);
    
    if (!response.success) {
      console.error(response.message);
      return getDefaultPricingPackages();
    }
    
    // If no packages in database, return default packages
    if (!response.data || response.data.length === 0) {
      return getDefaultPricingPackages();
    }
    
    return response.data;
  } catch (error) {
    console.error("Error fetching pricing packages:", error?.response?.data?.message || error);
    return getDefaultPricingPackages();
  }
};

// Default pricing packages as fallback
const getDefaultPricingPackages = () => {
  return [
    {
      Id: 1,
      Name: "Starter Package",
      quantity_c: 100,
      price_c: 9.99,
      popular: false
    },
    {
      Id: 2,
      Name: "Popular Package", 
      quantity_c: 250,
      price_c: 19.99,
      popular: true
    },
    {
      Id: 3,
      Name: "Professional Package",
      quantity_c: 500,
      price_c: 34.99,
      popular: false
    },
    {
      Id: 4,
      Name: "Enterprise Package",
      quantity_c: 1000,
      price_c: 49.99,
      popular: false
    }
  ];
};

// Purchase Credits - creates credit record and processes purchase
export const purchaseCredits = async (packageData, userId) => {
  try {
    // Create credit record for the user
    const creditParams = {
      records: [{
        Name: `Credit Purchase - ${packageData.quantity_c} Credits`,
        amount_c: packageData.quantity_c,
        user_c: userId
      }]
    };
    
    const response = await apperClient.createRecord('credit_c', creditParams);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error('Failed to process credit purchase. Please try again.');
    }
    
    if (response.results && response.results.length > 0) {
      const successfulRecord = response.results.find(result => result.success);
      if (successfulRecord) {
        return {
          success: true,
          credits: packageData.quantity_c,
          transactionId: successfulRecord.data.Id,
          message: `Successfully purchased ${packageData.quantity_c} credits!`
        };
      }
    }
    
    throw new Error('Purchase processed but credit allocation failed.');
  } catch (error) {
    console.error("Error purchasing credits:", error?.response?.data?.message || error);
    throw new Error(error.message || 'Failed to complete purchase. Please try again.');
  }
};

// Get all pricing data (admin function)
export const getAllPrices = async () => {
  try {
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "Tags" } },
        { field: { Name: "quantity_c" } },
        { field: { Name: "price_c" } },
        { field: { Name: "credit_c" } },
        { field: { Name: "CreatedOn" } }
      ],
      orderBy: [{ fieldName: "CreatedOn", sorttype: "DESC" }],
      pagingInfo: { limit: 50, offset: 0 }
    };
    
    const response = await apperClient.fetchRecords('price_c', params);
    
    if (!response.success) {
      console.error(response.message);
      return [];
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching all prices:", error?.response?.data?.message || error);
    return [];
  }
};

// Create new price package (admin function)
export const createPricePackage = async (packageData) => {
  try {
    const params = {
      records: [{
        Name: packageData.name,
        quantity_c: packageData.quantity,
        price_c: packageData.price,
        credit_c: packageData.creditId || null
      }]
    };
    
    const response = await apperClient.createRecord('price_c', params);
    
    if (!response.success) {
      console.error(response.message);
      return null;
    }
    
    if (response.results && response.results.length > 0) {
      const successfulRecord = response.results.find(result => result.success);
      return successfulRecord ? successfulRecord.data : null;
    }
    
    return null;
  } catch (error) {
    console.error("Error creating price package:", error?.response?.data?.message || error);
    return null;
  }
};

// Update price package (admin function)
export const updatePricePackage = async (packageId, packageData) => {
  try {
    const params = {
      records: [{
        Id: packageId,
        Name: packageData.name,
        quantity_c: packageData.quantity,
        price_c: packageData.price,
        credit_c: packageData.creditId || null
      }]
    };
    
    const response = await apperClient.updateRecord('price_c', params);
    
    if (!response.success) {
      console.error(response.message);
      return null;
    }
    
    if (response.results && response.results.length > 0) {
      const successfulRecord = response.results.find(result => result.success);
      return successfulRecord ? successfulRecord.data : null;
    }
    
    return null;
  } catch (error) {
    console.error("Error updating price package:", error?.response?.data?.message || error);
    return null;
  }
};

// Delete price package (admin function)
export const deletePricePackage = async (packageId) => {
  try {
    const params = {
      RecordIds: [packageId]
    };
    
    const response = await apperClient.deleteRecord('price_c', params);
    
    if (!response.success) {
      console.error(response.message);
      return false;
    }
    
    if (response.results && response.results.length > 0) {
      const successfulDeletion = response.results.find(result => result.success);
      return !!successfulDeletion;
    }
    
    return false;
  } catch (error) {
    console.error("Error deleting price package:", error?.response?.data?.message || error);
    return false;
  }
};