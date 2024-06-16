/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
  useUpdateCategoryMutation,
} from '../../redux/api/categoryApiSlice';
import CategoryForm from '../../components/CategoryForm.jsx';
import { toast } from 'react-toastify';

const CategoryList = () => {
  const { data: categories } = useFetchCategoriesQuery();
  const { name, setName } = useState('');
  const { selectedCategory, setselectedCategory } = useState(null);
  const { updateName, setupdateName } = useState('');
  const { modalVisible, setModalVisible } = useState('');

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handledCreateCategory = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error('Category name is required');
    }

    try {
      const result = await createCategory().unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName('');
        toast.success(`${result.name} is created.`);
      }
    } catch (error) {
      console.error(error);
      toast.error('Creating category failed, try again');
    }
  };

  return (
    <div className='ml-[10rem] flex flex-col md:flex-row'>
      {/* <AdminMenu/> */}
      <div className='md:w-3/4 p-3'>
        <div className='h-12'>Manage Categories </div>
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handledCreateCategory}
        />
        <br />
        <hr />

        <div className='flex flex-wrap'>
          {categories?.map((category) => (
            <div key={category._id}>
              <button
                className='bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacitiy-50'
                onClick={() => {
                  {
                    setModalVisible(true);
                    setSelectedCategory(category);
                    setUpdateName(category.name);
                  }
                }}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
