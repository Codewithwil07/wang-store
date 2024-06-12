/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from '../../redux/api/categoryApiSlice';
import CategoryForm from '../../components/CategoryForm';

const CategoryList = () => {
  const { data: categories } = useFetchCategoriesQuery();
  const { name, setName } = useState('');
  const { selectedCategory, setselectedCategory } = useState(null);
  const { updateName, setupdateName } = useState('');
  const { modalVisible, setModalVisible } = useState('');

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  return (
    <div className='ml-[10rem] flex flex-col md:flex-row'>
      {/* <AdminMenu/> */}
      <div className='md:w-3/4 p-3'>
        <div className='h-12'>Manage Categories </div>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}
        />
        <br />
        <hr />

        <div className='flex flex-wrap'>
          {
            categories?.map(category => (
              <div key={category._id}></div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
