export interface NearLockAppType {
  setIsModalOpen: (arg0: boolean) => void;
  setActiveTab: (arh0: number) => void;
  setIsSetupDone: (arg0: boolean) => void;
  setIsSidebarOpen: (arg0: boolean) => void;
  setIsSearchOpen: (arg0: boolean) => void;
  toggleTab: (arg0: number) => void;
  toggleSidebar: () => void;
  toggleSearch: () => void;
  activeTab: number;
  isSidebarOpen: boolean;
  isSearchOpen: boolean;
  searchRef: React.MutableRefObject<HTMLInputElement>;
  isDarkMode: boolean;
  isSetupDone: boolean;
  menuItems: { id: number; title: string; showInMenu: boolean; disabled?: boolean }[];
  owner: string;
  device: string;
  isModalOpen: boolean;
}
