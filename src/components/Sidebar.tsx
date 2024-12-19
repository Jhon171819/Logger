import React from 'react';
import { Menu } from 'antd';
import { Inbox, Briefcase, ShoppingCart, Users, Star } from 'lucide-react';
import { useMailStore } from '../store/mailStore';
import styles from "../styles/sidebar.module.css"
import { useStyleStore } from '../../stores/style';

const categories = [
  { key: 'All', icon: <Inbox size={18} />, label: 'All' },
  { key: 'Work', icon: <Briefcase size={18} />, label: 'Work' },
  { key: 'Shopping', icon: <ShoppingCart size={18} />, label: 'Shopping' },
  { key: 'Social', icon: <Users size={18} />, label: 'Social' },
  { key: 'Starred', icon: <Star size={18} />, label: 'Starred' },
];

export const Sidebar: React.FC = () => {
  const {theme} = useStyleStore()
  const { selectedCategory, setSelectedCategory } = useMailStore();
  return (
    theme ?
      (<Menu
        theme={theme}
        mode="inline"
        selectedKeys={[selectedCategory]}
        items={categories}
        onClick={({ key }) => setSelectedCategory(key)}
        className={styles.sidebar}
      />) : null
  );
};
