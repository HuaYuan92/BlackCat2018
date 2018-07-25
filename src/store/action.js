import * as types from './type'
export default {
  LoginCheck:({commit})=>{
    commit(types.LOGIN_CHECK)
  },
  ReadLocal:({commit})=>{
    commit(types.Read_Local)
  },
  SearchName:({commit})=>{
    commit(types.Search_Name)
  },
  SearchCode:({commit})=>{
    commit(types.Search_Code)
  },
  SelectTime:({commit})=>{
    commit(types.Select_Time)
  },
  HoldFetchEnt:({commit})=>{
    commit(types.Hold_Fetch_Ent)
  },
  HoldFetchPerson:({commit})=>{
    commit(types.Hold_Fetch_Person)
  },
  SearchPerson:({commit})=>{
    commit(types.Search_Person)
  },
  UserChange:({commit})=>{
    commit(types.User_Change)
  },
  Quit:({commit})=>{
    commit(types.Quit)
  },

}
