import { Box, Button, InputBase, TextField, Typography, alpha, styled } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Header from '../Header';



export default function Cart() {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [products, setProduct] = useState();
useEffect(()=>{
    fetchDataProduct();
},[])
const fetchDataProduct = async () => {
    const accessToken = localStorage.getItem('accessToken');
    fetch('http://127.0.0.1:8006/api/get-items/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
          // Thêm các header khác nếu cần
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Xử lý dữ liệu trả về từ API
        setProduct(data.data)
        console.log(data)
      })
      .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
      });
    };

    const [selectedProductsId, setSelectedProductsId] = useState([]);

    // Hàm xử lý sự kiện chọn sản phẩm
    const handleProductSelect = (productId, idT) => {
        console.log(productId)
      if (selectedProducts.includes(productId)) {
        setSelectedProducts(selectedProducts.filter(id => id !== productId));
      } else {
        setSelectedProducts([...selectedProducts, productId]);
      }

      if (selectedProductsId.includes(idT)) {
        setSelectedProductsId(selectedProductsId.filter(id => id !== idT));
      } else {
        setSelectedProductsId([...selectedProductsId, idT]);
      }
    };

    console.log(selectedProductsId)
  
    // Tính tổng tiền
    const calculateTotal = () => {
      let total = 0;
      selectedProductsId.forEach(productId => {
        const product = data.find(p => p.id === productId);
        console.log(product)
        if (product) {
          total += getPriceById(data, productId);
          console.log(getPriceById(data, 9))
        }
      });
      return total;
    };


    const [data, setData] = useState();
const [data1, setData1] = useState();
const [data2, setData2] = useState();
  useEffect(() => {
    fetchData();
    fetchData1();
    fetchData2();
  }, []);
const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8002/api/books/');
        const responseData = await response.json();
        setData(responseData);
        console.log(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchData1 = async () => {
      try {
        const response = await fetch('http://localhost:8003/api/clothes/');
        const responseData = await response.json();
        setData1(responseData);
        console.log(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const fetchData2 = async () => {
      try {
        const response = await fetch('http://localhost:8005/api/mobiles/');
        const responseData = await response.json();
        setData2(responseData);
        console.log(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    function getNameById(input, id) {
        const item = input.find(item => item.id === id);
        return item ? item.title : 'Unknown';
    }
    function getPriceById(input, id) {
        const item = input.find(item => item.id === id);
        return item ? item.price : 'Unknown';
    }
  return (
    <Box style={{
      backgroundColor:'#F7EEDD',
      height: 1000
    }}>
      <Header></Header>
      <Box style={{
        width: "100%",
        // maxWidth: 500,
        marginTop: 30,
        display:'flex',
        justifyContent: 'center'
      }}>
      <Box style={{
        width: '80%'
      }}>
      <h2 style={{ textAlign: 'center', color: 'blue' }}>Shopping Cart</h2>
       <Box>
      <ul style={{ listStyleType: 'none', paddingTop: 30 }}>
      <li style={{ borderBottom: '1px solid #ccc', paddingBottom: '20px', fontWeight: 'bold' }}>
        <span style={{paddingRight: '5%'}}>CheckBox</span>
        <span  style={{ width: '20%', display: 'inline-block',  textAlign: 'center'}}>Product name</span>
        <span  style={{ width: '24%', display: 'inline-block',  textAlign: 'center'}}>Type</span>
        <span  style={{ width: '6%', display: 'inline-block',  textAlign: 'center'}}>Price</span>
        <span  style={{ width: '29%', display: 'inline-block',  textAlign: 'center'}}>Quantity</span>
        <span  style={{ width: '1%', display: 'inline-block',  textAlign: 'center'}}>Total</span>
      </li>
      {products && data && products.map(product => (
        <li key={product.id} style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
            <input
            type="checkbox"
            checked={selectedProducts.includes(product.id)}
            onChange={() => handleProductSelect(product.id, product.product_id)}
            style={{ }}
            />
            <span style={{width: '35%', display: 'inline-block',  textAlign: 'center'  }}>{getNameById(data, product.product_id)}</span>
            <span style={{ width: '10%', display: 'inline-block',  textAlign: 'center' }}>{product.product_type}</span>
            {
            data.map(item => (
                <React.Fragment key={item.id}>
                {
                    item.id === product.product_id && (
                    <span>
                        {/* Hiển thị thông tin sản phẩm từ dữ liệu đã được cập nhật */}
                        <span style={{ width: '20%', display: 'inline-block',  textAlign: 'center' }}>{item.price}</span>
                        <span style={{ width: '15%', display: 'inline-block',  textAlign: 'center' }}>{product.quantity}</span>
                        <span style={{ width: '17%', display: 'inline-block',  textAlign: 'center'}}>{item.price*product.quantity}</span>
                        {/* Thêm các thông tin sản phẩm khác nếu cần */}
                    </span>
                    )
                }
                </React.Fragment>
            ))
            }
        </li>
        ))}

        {/* {products &&  data && products.map(product => (
          <li key={product.id} style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
            <input
              type="checkbox"
              checked={selectedProducts.includes(product.id)}
              onChange={() => handleProductSelect(product.id, product.product_id)}
              style={{ marginRight: '10px' }}
            />
            <span style={{ fontWeight: 'bold' }}>{product.quantity}</span>
            <span style={{ marginLeft: '10px' }}>{getNameById(data,product.product_id)}</span>
            <span style={{ marginLeft: '10px' }}>{product.product_type}</span>
            {
                data.map(item => (
         <Box>
            {
                item.id === product.product_id && (

                )
            }
         </Box>
        )
            }
          </li>

        ))} */}
      </ul>
      </Box>
      <p style={{ textAlign: 'right', marginTop: '20px' }}>Total: ${calculateTotal()}</p>
      </Box>
      
      </Box>
    </Box>
  )
}
