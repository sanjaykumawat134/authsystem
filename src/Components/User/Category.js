import { Autocomplete, Button, TextField } from "@mui/material";
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
const Category = (props) => {
  useEffect(() => {
    props.getAllCategories();
  }, []);

  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
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
        //    <li key={category._id}> 
        //         {category.name}
        //         {
        //  category.children.length>0 ?<ul>{renderCategories(category.children)}</ul>:null
        //         }
        //    </li>  
      );
    }
    return categoryList;
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
      toggleCategoryDialog
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);