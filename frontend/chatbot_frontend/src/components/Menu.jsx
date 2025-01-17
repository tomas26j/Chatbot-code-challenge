import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenu } from '../redux/menuSlice';

const Menu = () => {
  const dispatch = useDispatch();
  const menuItems = useSelector((state) => state.menu);

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  return (
    <div>
      <ul>
        {menuItems && menuItems.length > 0 ? (
          menuItems.map(item => (
            <li key={item._id}>
              {item.name} - ${item.price}
              <p>{item.description}</p>
            </li>
          ))
        ) : (
          <p>Cargando menú...</p>
        )}
      </ul>
    </div>
  );
};

export default Menu;
