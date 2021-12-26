import * as Actions from "../action/categoryActions";

const intialState ={
    categories :[]
};

const buildNewCategories =(parentId ,categories,newCategory)=>{
      let newCategories = [];
      if(parentId===undefined){
          return [
              ...categories,
              {
                  _id:newCategory._id,
                  name:newCategory.name,
                  slug:newCategory.slug,
                  children:[

                  ]
              }
          ]
      }
      for (let cat of categories){
        console.log("idgg",cat)
          if(cat._id==parentId){

              newCategories.push({
                  ...cat,
                  children:cat.children  ? buildNewCategories(parentId,[...cat.children,{
                      _id:newCategory._id,
                      name:newCategory.name,
                      parentId:newCategory.parentId,
                      children:newCategory.children,
                      slug:newCategory.slug,

                  }],newCategory):[]
              })
          }else{
            newCategories.push({
                ...cat,
                children:cat.children ? buildNewCategories(parentId , cat.children,newCategory):[]
            })
          }
      }
      return newCategories;
}
const categoryReducer = (state = intialState, action) => {
    switch(action.type){
        case Actions.GET_ALL_CATEGORIES:{
            return {
                ...state,
                categories:action.payload
            }
        }
        case Actions.ADD_CATEGORY:{
            let updatedCategory = buildNewCategories(action.payload.parentId,state.categories,action.payload)
            console.log(updatedCategory)
            return {
                ...state,
                categories:updatedCategory
            }
        }
        default: {
            return state;
          }
    }
};

export default categoryReducer;