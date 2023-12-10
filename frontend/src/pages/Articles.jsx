import { SearchOutlined } from '@ant-design/icons';
import React, { useRef, useState } from 'react';
import {  Input, Space , Popconfirm, Table ,Tag, Button, ConfigProvider } from 'antd';

export default function Articles(props) {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div
          style={{
            padding: 8,
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: 'block',
            }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{
                width: 90,
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{
                width: 90,
              }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({
                  closeDropdown: false,
                });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              close
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? '#f50' : "white",
          }}
        />
      ),
      onFilter: (value, record) =>
      
      record[dataIndex]&&record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
   text
        ) : (
          text
        ),
    });
    const columns = [
        {
          title: 'ISSN',
          dataIndex: 'issn',
          width: '14%',
          ...getColumnSearchProps('issn'),
          render: (_, record) => {
            return  (
              <Tag color="magenta" key={record.issn}>
              {record.issn}
            </Tag>
            );
          },
        },
        {
            title: 'Title',
            dataIndex: 'title',
            width: '14%',
            ...getColumnSearchProps('title'),
            render: (_, record) => {
                return  (
                 <p style={{fontWeight:"600"}}>
               
                  {record.title}
                 
                 </p>
                );
              },
        },
        {
            title: 'article_link',
            dataIndex: 'article_link',
            width: '14%',
            ...getColumnSearchProps('article_link'),
            render: (_, { article_link }) => (
              <>
              
              {/* <span className="font-bold" style={{color:"rgb(219 39 119 )"}}> */}
              <Button type="link">
                      {article_link}
                      </Button>
                    {/* </span> */}
               
              </>
            ),
          },
        {
            title: 'journal_name',
            dataIndex: 'journal_name',
            width: '14%',
            ...getColumnSearchProps('journal_name'),
            render: (_, record) => {
                return  (
                 <p style={{color:"rgb(145, 85, 253)",fontWeight:"800"}}>
               
                  {record.journal_name}
                 
                 </p>
                );
              },
        },
        {
            title: 'Doi',
            dataIndex: 'doi',
            width: '14%',
            ...getColumnSearchProps('doi'),
            render: (_, record) => {
                return  (
                    <>
                            {/* // <span className="font-bold" style={{color:"rgb(219 39 119 )"}}> */}
                            {record.doi}
                          {/* </span> */}
                          </>
                );
              },
        },

        {
            title: 'date_publication',
            dataIndex: 'date_publication',
            width: '14%',
            ...getColumnSearchProps('date_publication'),
        },
        {
            title: 'country',
            dataIndex: 'country',
            ...getColumnSearchProps('country'),
            width: '14%',
                      render: (_, record) => {
            return  (
              <Tag color="#f50" key={record.country}>
              {record.country}
            </Tag>
            );
          },
        },
        {
          title: "total_usage",
          dataIndex: 'total_usage',
          width: '14%',
          render: (_, { total_usage }) => (
            <>
            
            <Tag color="green" key={total_usage}>
                    {total_usage}
                  </Tag>
             
            </>
          ),
        },
]
return(
    <div style={{padding:"0 2vw",display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                <ConfigProvider
  theme={{
    components: {
      Table: {
        headerBg:"rgb(145, 85, 253)",
        headerColor:"white"
      },
      token: {
        colorPrimary:"red"
      },
    },
  }}
>
<Table columns={columns} dataSource={props.articles}  />
          </ConfigProvider>
    </div>
)
}