// AsyncStorageHelper.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITE_PRODUCTS_KEY = 'favoriteProducts';

export const getFavoriteProducts = async () => {
  try {
    const favoriteProducts = await AsyncStorage.getItem(FAVORITE_PRODUCTS_KEY);
    if (favoriteProducts) {
      return JSON.parse(favoriteProducts);
    }
    return [];
  } catch (error) {
    console.error('Error retrieving favorite products:', error);
    return [];
  }
};

export const addFavoriteProduct = async (productId, dispatch) => {
  try {
    const favoriteProducts = await getFavoriteProducts();

    // Check if the product ID is not already in the array
    console.log(favoriteProducts);
    if (!favoriteProducts.includes(productId)) {
      favoriteProducts.push(productId);
      dispatch(favoriteProducts);

      await AsyncStorage.setItem(
        FAVORITE_PRODUCTS_KEY,
        JSON.stringify(favoriteProducts),
      );
    } else {
      removeFavoriteProduct(productId, dispatch);
    }
  } catch (error) {
    console.error('Error adding favorite product:', error);
  }
};

export const removeFavoriteProduct = async (productId, dispatch) => {
  try {
    const favoriteProducts = await getFavoriteProducts();
    const updatedProducts = favoriteProducts.filter(id => id !== productId);
    dispatch(updatedProducts);
    await AsyncStorage.setItem(
      FAVORITE_PRODUCTS_KEY,
      JSON.stringify(updatedProducts),
    );
  } catch (error) {
    console.error('Error removing favorite product:', error);
  }
};
