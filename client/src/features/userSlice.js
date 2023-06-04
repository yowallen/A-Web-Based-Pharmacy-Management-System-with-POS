import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "./userService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  users: [],
  salesToday: 0,
  costsToday: 0,
  salesCountToday: 0,
  productsCount: 0,
  salesHistory: [],
  salesHistoryToday: [],
  categories: [],
  products: [],
  expiredProducts: [],
  monthSales: [],
  receipt: [],
  topProduct: [],
  lowProduct: [],
  almostExpired: [],
};

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ userData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await userService.userLogin(userData);
      navigate("/");
      toast.success("Login Successful");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const addUser = createAsyncThunk(
  "user/adduser",
  async ({ userData, toast }, { rejectWithValue }) => {
    try {
      const response = await userService.addUser(userData);
      toast.success("User Added");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const editUser = createAsyncThunk(
  "user/edituser",
  async ({ id, userData, toast }, { rejectWithValue }) => {
    try {
      const response = await userService.editUser(id, userData);
      toast.success("User Updated");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const allUser = createAsyncThunk("user/alluser", async () => {
  const response = await userService.allUser();
  return response.data;
});

export const userLogout = createAsyncThunk("user/logout", async () => {
  localStorage.removeItem("user");
});

export const getSales = createAsyncThunk("user/getsales", async () => {
  const response = await userService.getSales();
  return response.data;
});

export const getTodaySalesTotal = createAsyncThunk(
  "user/salestoday",
  async () => {
    const response = await userService.getTodaySalesTotal();
    return response.data;
  }
);

export const getSalesCountToday = createAsyncThunk(
  "user/salescount",
  async () => {
    const response = await userService.getSalesCountToday();
    return response.data;
  }
);

export const addProduct = createAsyncThunk(
  "user/addproduct",
  async ({ productData, toast }, { rejectWithValue }) => {
    try {
      const response = await userService.addProduct(productData);
      toast.success("Product Added");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const productCount = createAsyncThunk("user/productcount", async () => {
  const response = await userService.productCount();
  return response.data;
});

export const addCategory = createAsyncThunk(
  "user/addcategory",
  async ({ categoryData, toast }, { rejectWithValue }) => {
    try {
      const response = await userService.addCategory(categoryData);
      toast.success("Category Added");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getCategories = createAsyncThunk("user/getcategory", async () => {
  const response = await userService.getCategories();
  return response.data;
});

export const getProducts = createAsyncThunk("user/getproduct", async () => {
  const response = await userService.getProduct();
  return response.data;
});

export const createSales = createAsyncThunk(
  "user/createsales",
  async ({ sales, isDiscounted, toast }, { rejectWithValue }) => {
    try {
      const response = await userService.createSales({ sales, isDiscounted });
      toast.success("Pay Successful");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getSalesToday = createAsyncThunk(
  "user/saleslisttoday",
  async () => {
    const response = await userService.getSalesListToday();
    return response.data;
  }
);

export const getCostToday = createAsyncThunk("user/costtoday", async () => {
  const response = await userService.getCostToday();
  return response.data;
});

export const getExpiredProducts = createAsyncThunk(
  "user/expiredproducts",
  async () => {
    const response = await userService.getExpired();
    return response.data;
  }
);

export const getMonthSales = createAsyncThunk("user/monthsales", async () => {
  const response = await userService.getMonthSales();
  return response.data;
});

export const updatecategory = createAsyncThunk(
  "user/updatecategory",
  async ({ id, updatedCategory, toast }, { rejectWithValue }) => {
    try {
      const response = await userService.updatedCategory(id, updatedCategory);
      toast.success("Category Updated");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "user/deletecategory",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await userService.deleteCategory(id);
      toast.success("Category Deleted");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "user/updateproduct",
  async ({ id, productData, toast }, { rejectWithValue }) => {
    try {
      const response = await userService.updateProduct(id, productData);
      toast.success("Product Updated");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "user/deleteproduct",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await userService.deleteProduct(id);
      toast.success("Product Deleted");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const topProducts = createAsyncThunk("user/topproducts", async () => {
  const response = await userService.topProducts();
  return response.data;
});

export const lowProducts = createAsyncThunk("user/lowquantity", async () => {
  const response = await userService.lowProducts();
  return response.data;
});

export const getAlmostExpired = createAsyncThunk(
  "user/almostexpired",
  async () => {
    const response = await userService.almostExpired();
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [userLogin.fulfilled]: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    [userLogout.fulfilled]: (state) => {
      state.user = null;
    },
    [getSales.fulfilled]: (state, action) => {
      state.salesHistory = action.payload;
    },
    [getTodaySalesTotal.fulfilled]: (state, action) => {
      state.salesToday = action.payload;
    },
    [getSalesCountToday.fulfilled]: (state, action) => {
      state.salesCountToday = action.payload;
    },
    [productCount.fulfilled]: (state, action) => {
      state.productsCount = action.payload;
    },
    [addCategory.fulfilled]: (state, action) => {
      state.categories.push(action.payload);
    },
    [getCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
    },
    [addProduct.fulfilled]: (state, action) => {
      state.products.unshift(action.payload);
    },
    [getProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
    },
    [createSales.fulfilled]: (state, action) => {
      state.salesHistory.unshift(action.payload);
      state.receipt = action.payload;
    },
    [getSalesToday.fulfilled]: (state, action) => {
      state.salesHistoryToday = action.payload;
    },
    [getCostToday.fulfilled]: (state, action) => {
      state.costToday = action.payload;
    },
    [getExpiredProducts.fulfilled]: (state, action) => {
      state.expiredProducts = action.payload;
    },
    [getMonthSales.fulfilled]: (state, action) => {
      state.monthSales = action.payload;
    },
    [allUser.fulfilled]: (state, action) => {
      state.users = action.payload;
    },
    [addUser.fulfilled]: (state, action) => {
      state.users.unshift(action.payload);
    },
    [updatecategory.fulfilled]: (state, action) => {
      state.categories = state.categories.map((category) => {
        if (category._id === action.payload._id) {
          return action.payload;
        }
        return category;
      });
    },
    [deleteCategory.fulfilled]: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category._id !== action.payload._id
      );
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.products = state.products.map((product) => {
        if (product._id === action.payload._id) {
          return action.payload;
        }
        return product;
      });
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
    },
    [editUser.fulfilled]: (state, action) => {
      state.users = state.users.map((user) => {
        if (user._id === action.payload._id) {
          return action.payload;
        }
        return user;
      });
    },
    [topProducts.fulfilled]: (state, action) => {
      state.topProduct = action.payload;
    },
    [lowProducts.fulfilled]: (state, action) => {
      state.lowProduct = action.payload;
    },
    [getAlmostExpired.fulfilled]: (state, action) => {
      state.almostExpired = action.payload;
    },
  },
});

export default userSlice.reducer;
