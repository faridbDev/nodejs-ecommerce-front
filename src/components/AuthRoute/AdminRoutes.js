import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserProfileAction } from '../../redux/slices/users/usersSlice';
import AdminOnly from '../NotAuthorized/AdminOnly';

const AdminRoutes = ({children}) => {
  // dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);
  // get user from store
  const { userAuth } = useSelector((state) => state?.users);
  const isAdmin = userAuth?.userInfo?.userFound?.isAdmin ? true: false;
  if (!isAdmin)
    return <AdminOnly/>;
  return <>{children}</>;
}

export default AdminRoutes;
