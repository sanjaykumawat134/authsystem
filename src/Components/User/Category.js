import { Autocomplete, Button, ButtonGroup, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllCategories } from "../../store/action/categoryActions";
import { toggleCategoryDialog } from "../../store/action/uiActions";
import SimpleDialog from "../UI/SimpleDialog";
import CategoryForm from "./CategoryForm";

import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faFolder, faFile, faCheck, faChevronRight, faChevronDown, faPlusSquare, faMinusSquare, faFolderOpen, } from '@fortawesome/free-solid-svg-icons'
import { updateCateogry,deleteCateogry } from "../../store/action/categoryActions";
const Category = (props) => {
  useEffect(() => {
    props.getAllCategories();
  }, []);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryDialog, setUpdateCategoryDialog] = useState(false);
  const [deleteCategoryDialog, setDeleteCategoryDialog] = useState(false);
  const handleClickOpen = () => {
    props.toggleCategoryDialog();
  }
  const renderCategories = (categories) => {
    let categoryList = [];
    for (let category of categories) {
      categoryList.push(

        {
          label: category.name,
          value: category._id,
          children: category.children.length > 0 && renderCategories(category.children)
        }
      );
    }
    return categoryList;
  }
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id, name: category.name, parentId: category.parentId
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  }
  const updateCategoryHandler = () => {
    setUpdateCategoryDialog(true);
    updateExpandAndCheckedCategories();
  }
  const updateExpandAndCheckedCategories = () => {
    const categories = createCategoryList(props.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 && checked.forEach((categoryId, index) => {
      const category = categories.find((category, _index) => categoryId == category.value);
      category && checkedArray.push(category);
    })
    expanded.length > 0 && expanded.forEach((categoryId, index) => {
      const category = categories.find((category, _index) => categoryId == category.value);
      category && expandedArray.push(category);
    })
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  }
  const deleteCategoryHandler = () => {
    setDeleteCategoryDialog(true)
    updateExpandAndCheckedCategories();

  }
  const handleCategoryInput = (key, value, index, type) => {
    console.log(value);
    if (type == "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item);
      setCheckedArray(updatedCheckedArray);
    } else if (type == "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item);
      setExpandedArray(updatedExpandedArray);
    }
  }
  const updateCategoriesForm = async () => {
    // const form = new FormData();
    let values = [];
    expandedArray.forEach((item, index) => {
      // idArr.push({_id: item.value})
      values.push({ _id: item.value, name: item.name, parentId: item.parentId })
      //   idArr.map((idElem)=>{
      //     console.log("gg")
      //     return idElem?._id === item.value ? idElem : {_id: item.value}
      // });
      // form.append('_id', item.value);
      // form.append('name', item.name);
      // form.append('parentId', item.parentId ? item.parentId : "");
    });
    checkedArray.forEach((item, index) => {
      // idArr.map((idElem)=>idElem?._id === item.value ? idElem : {_id: item.value});
      // form.append('_id', item.value);
      values.push({ _id: item.value, name: item.name, parentId: item.parentId })
      // form.append('name', item.name);
      // form.append('parentId', item.parentId ? item.parentId : "");
    });
    // dispatch(updateCategories(form));
    console.log("id", values)
    const resp = await props.updateCateogry(values);
    if (resp) {
      props.getAllCategories();
      setUpdateCategoryDialog(false)
    }
  }
  const deleteCategories =async ()=>{
    
      const checkedIdsArray = checkedArray.map((item,index)=>{
        return {
          _id:item.value
        }
      });
      // const expandedIdsArray = expandedArray.map((item,index)=>{
      //   return {
      //     _id:item.value
      //   }
      // });
    //  const idsArray = checkedIdsArray.concat(expandedIdsArray);
     console.log("checked",checkedIdsArray)
     console.log("undcheck",expandedArray)
    //  props.deleteCateogry(idsArray)
    const resp = await props.deleteCateogry(checkedIdsArray);
    if(resp){
      props.getAllCategories();
    }
     setDeleteCategoryDialog(false);
  }
  return <div>
    <Button variant="contained" onClick={handleClickOpen} >Add</Button>
    <div>
      {/* <ul>
                {renderCategories(props.categories)}
            </ul> */}
      <CheckboxTree
        nodes={renderCategories(props.categories)}
        checked={checked}
        expanded={expanded}
        onCheck={checked => setChecked(checked)}
        onExpand={expanded => setExpanded(expanded)}
        icons={{
          check: <FontAwesomeIcon icon={faCheckSquare} />,
          uncheck: <FontAwesomeIcon icon={faCheck} />,
          halfCheck: <FontAwesomeIcon icon={faCheckSquare} />,
          expandClose: <FontAwesomeIcon icon={faChevronRight} />,
          expandOpen: <FontAwesomeIcon icon={faChevronDown} />,
          expandAll: <FontAwesomeIcon icon={faPlusSquare} />,
          collapseAll: <FontAwesomeIcon icon={faMinusSquare} />,
          parentClose: <FontAwesomeIcon icon={faFolder} />,
          parentOpen: <FontAwesomeIcon icon={faFolderOpen} />,
          leaf: <FontAwesomeIcon icon={faFile} />

        }}
      />
    </div>
    <div className="flex flex-row">
      <Button variant="contained" onClick={updateCategoryHandler} >Edit</Button>
      <Button variant="contained" onClick={deleteCategoryHandler} >Delete</Button>

    </div>



    {
      props.categoryDialog && <SimpleDialog
        open={props.categoryDialog}
        title="Add Category"
        onClose={props.toggleCategoryDialog}
        content={
          <CategoryForm />

        }
      />
    }
    {updateCategoryDialog && <SimpleDialog
      open={updateCategoryDialog}
      title="Update Category"
      onClose={() => { setUpdateCategoryDialog(false) }}
      content={
        <div>
          <div className="flex-col sm:flex-row m-5 ">
            {
              expandedArray.length > 0 && expandedArray.map((item, index) => {
                return (<div className="flex mt-4 p-4">
                  <TextField
                    id="category_name"
                    label="Category Name"
                    className="p-12 my-12"
                    variant="outlined"
                    value={item.name}
                    onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                    required
                  />

                  <select
                    className="form-control"
                    value={item.parentId}
                    onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}>
                    <option>select category</option>
                    {
                      createCategoryList(props.categories).map(option =>
                        <option key={option.value} value={option.value}>{option.name}</option>
                      )
                    }
                  </select>
                  {/* <Autocomplete
                    autoComplete={false}
                    id="category"
                    options={createCategoryList(props.categories)}
                    value={item.parentId}
                    className="flex-1"
                    onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}
                    getOptionLabel={(option) => {
                      if (option?.name) {
                        return `${option.name}`;
                      } else {
                        return option || "";
                      }
                    }}
                    isOptionEqualToValue={(option, value) => {
                      console.log("optionss", value)
                      return option.name === value
                    }
                    }
                    renderInput={(params) => {
                      params.inputProps.className = "p-8";
                      return (
                        <TextField
                          label="Category"
                          variant="outlined"
                          {...params}

                        />
                      );
                    }}
                  /> */}


                </div>)
              }
              )}
            <h6>checked</h6>
            {
              checkedArray.length > 0 && checkedArray.map((item, index) => {
                return (<div className="flex mt-4 p-4">
                  <TextField
                    id="category_name"
                    label="Category Name"
                    className="p-12 my-12"
                    variant="outlined"
                    value={item.name}
                    onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                    required

                  />

                  {/* <Autocomplete
                    autoComplete={false}
                    id="category"
                    options={createCategoryList(props.categories)}
                    value={item.parentId}
                    className="flex-1"
                    onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}
                    getOptionLabel={(option) => {
                      if (option?.name) {
                        return `${option.name}`;
                      } else {
                        return option || "";
                      }
                    }}
                    isOptionEqualToValue={(option, value) => {
                      console.log("optionss", value)
                      return option.name === value
                    }
                    }
                    renderInput={(params) => {
                      params.inputProps.className = "p-8";
                      return (
                        <TextField
                          label="Category"
                          variant="outlined"
                          {...params}

                        />
                      );
                    }}
                  />  */}
                  <select
                    className="form-control"
                    value={item.parentId}
                    onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}>
                    <option>select category</option>
                    {
                      createCategoryList(props.categories).map(option =>
                        <option key={option.value} value={option.value}>{option.name}</option>
                      )
                    }
                  </select>


                </div>)
              }
              )}

          </div>
          <div className="flex m-2 justify-center">
            <ButtonGroup className={`m-1`}>
              <Button
                color="primary"

                variant="contained"
                // type="submit"
                onClick={updateCategoriesForm}

              >
                Edit
              </Button>
              <Button
                color="secondary"

                variant="contained"
                type="reset"
                onClick={() => { setUpdateCategoryDialog(false) }}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </div>
        </div>

      }
    />}
    {
      deleteCategoryDialog && <SimpleDialog
        open={deleteCategoryDialog}
        title="Delete Category"
        onClose={() => { setDeleteCategoryDialog(false) }}
        content={
          <div className="flex-col sm:flex-row m-5 ">
            <h5>Expanded</h5>
            {
              expandedArray.map((item, index) => <span key={index}>{item.name}</span>)
            }

            <h5>Checked</h5>
            { console.log("checked",checkedArray)}
            {
             
              checkedArray.map((item, index) => <span key={index}>{item.name}</span>)
            }

            <div className="flex m-2 justify-center">
              <ButtonGroup className={`m-1`}>
                <Button
                  color="primary"
                  variant="contained"
                // type="submit"
                onClick={deleteCategories}

                >
                  confirm
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  type="reset"
                  onClick={() => { setDeleteCategoryDialog(false) }}
                >
                  Cancel
                </Button>
              </ButtonGroup>
            </div>
          </div>
        }
      />
    }

  </div>
}

const mapStateToProps = (state) => {
  const { categories } = state.category
  return {
    categories,
    categoryDialog: state.ui.categoryDialog
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getAllCategories,
      toggleCategoryDialog,
      updateCateogry,
      deleteCateogry
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);