import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

const userInfoFromStorage=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null;

export const loginUser=createAsyncThunk(
  'user/loginUser',
  async({email,password},{rejectWithValue})=>{
    try{
      const res=await axios.post('/api/users/login',{email,password});
      return res.data;
    }catch(err){
      return rejectWithValue(err.response.data.message||'login failed')
    }
  }
)

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/users/register', { name, email, password });
      return res.data;
    } catch (err) {
      console.error('Register API error:', err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
  }
);


const userSlice = createSlice({
  name: 'user',
  initialState:{
    userInfo:userInfoFromStorage,
    loading:false,
    error:null,

  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo')
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(loginUser.pending,(state)=>{
      state.loading=true;
      state.error=null;
    })
    .addCase(loginUser.fulfilled,(state,action)=>{
      state.loading=false;
      state.userInfo=action.payload
      localStorage.setItem('userInfo',JSON.stringify(action.payload))
    })
    .addCase(loginUser.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.payload
    })
    .addCase(registerUser.pending,(state)=>{
      state.loading=true
      state.error=null
    })
    .addCase(registerUser.fulfilled,(state,action)=>{
      state.loading=false
      state.userInfo=action.payload
      localStorage.setItem('userInfo',JSON.stringify(action.payload))
    })
    .addCase(registerUser.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    })

  }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;