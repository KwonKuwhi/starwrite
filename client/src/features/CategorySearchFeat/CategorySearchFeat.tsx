import { useState, useRef, useEffect } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { nodes } from '../../widgets/CategoryView/index';
import './CategorySearchFeat.css';
import { baseApi } from '../../shared/api/BaseApi';

export type SearchTypes = {
  onSearch: (newSearchTerm: string) => void; // 반환 타입을 void로 변경
};

export const CategorySearchFeat = ({ onSearch }: SearchTypes) => {
  const [searchTerm, setSearchTerm] = useState(''); // api 데이터 담을 예정
  const [toggleSearch, setToggleSearch] = useState(false); // li 검색창
  const searchRef = useRef(null);

  // useEffect(() => {
  //   function handleClickOutside(event: any) {
  //     if (searchRef.current && !searchRef.current.contains(event.target)) {
  //       setToggleSearch(false);
  //     }
  //   }

  //   document.addEventListener('mousedown', handleClickOutside);

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [searchRef]);

  // console.log(searchRef);

  // console.log('baseApi', baseApi);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);

    // 검색어가 있고, 필터링된 결과가 있을 때만 목록을 표시
    if (
      newSearchTerm.trim() &&
      nodes.filter((node) =>
        node.label.toLowerCase().includes(newSearchTerm.toLowerCase()),
      ).length
    ) {
      setToggleSearch(true);
    }
  };

  const handleItemClick = (label: string) => {
    setSearchTerm(label);
    setToggleSearch(false);
  };

  const handleInputClick = () => {
    setToggleSearch(true);
  };
  const handleoutClick = () => {
    setToggleSearch(false);
  };

  const filterSearch = nodes.filter((node) =>
    node.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }} ref={searchRef}>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          onFocus={handleInputClick}
          onBlur={() => setTimeout(() => setToggleSearch(false), 100)}
          style={{
            paddingRight: '30px',
            position: 'relative',
            height: '40px',
            width: '500px',
            paddingLeft: '10px',
            background: '#212121',
            color: '#ffff',
          }}
          placeholder="노드를 입력해주세요"
        />
        <IoIosSearch
          style={{
            position: 'absolute',
            right: '10px',
            top: '22px',
            transform: 'translateY(-50%)',
            color: '#ffff',
          }}
        ></IoIosSearch>
        {toggleSearch && searchTerm.length != 0 && (
          <ul
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              overflow: 'auto',
              height: 'fit-content',
              maxHeight: '250px',
              zIndex: 1000,
              backgroundColor: `rgba(0, 0, 0, 0.8)`,
            }}
          >
            {filterSearch.length > 0 ? (
              filterSearch.map((item, index) => (
                <li
                  key={index}
                  style={{ padding: '15px', cursor: 'pointer', color: '#ffff' }}
                  onClick={() => handleItemClick(item.label)}
                  className="searchItem"
                >
                  {item.label}
                </li>
              ))
            ) : (
              <li style={{ padding: '15px', color: '#ffff' }}>
                검색 결과가 없습니다.
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};
