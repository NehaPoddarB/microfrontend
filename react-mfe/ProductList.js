import React, { useState, useRef, useEffect } from 'react';
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Button, styled } from '@mui/material'


export default function ProductList() {
    const [data, setData] = useState([])
    const data1=[{productImage: "https://www.knoldus.com/wp-content/uploads/2022/02/noida-office-2.jpg", productName: "knoldus", description: "knoldus LLP"}, {productImage: "https://www.knoldus.com/wp-content/uploads/2022/02/noida-office-2.jpg", productName: "knoldus", description: "knoldus LLP"}, {productImage: "https://www.knoldus.com/wp-content/uploads/2022/02/noida-office-2.jpg", productName: "knoldus", description: "knoldus LLP"}, {productImage: "https://www.knoldus.com/wp-content/uploads/2022/02/noida-office-2.jpg", productName: "knoldus", description: "knoldus LLP"}]
    useEffect(() => {
        const getInfo = function getInfo1() {
            return new Promise((resolve, reject) => {
                fetch("http://localhost:3000/products/", {
                    method: 'GET',
                })
                    .then(
                        response => response.json(),
                        () => {
                            reject()
                            return null
                        }
                    )
                    .then(data1 => {
                        if (data1) {
                            resolve(data1)
                        }
                    })
            })
        }
        getInfo().then(product => {
            const response = product
            setData(response);
        })
    }, [])

    return (
        <Box>
            <a
                style={{ textDecoration: 'none' }}
                href='http://localhost:4200'
            >
                <Button id='back'>BACK</Button>
            </a>
            <Grid container sx={{ paddingLeft: "2rem", flexWrap: "wrap", flexDirection: "row", marginTop: '5.5rem'}}>
                {data1.map(card => (
                    <Grid item xs={4} sm={4} md={4} lg={3} sx={{ marginTop: "40px" }}>
                        <Card
                            sx={{
                                backgroundColor: '#FFFFFF',
                                height: '100%',
                                position: 'relative',
                                width: '90%',
                                display: 'flex',
                                flexDirection: 'column',
                                borderRadius: 5,
                                justifyContent: 'space-between',
                                ':hover': {
                                    boxShadow: 10,
                                },
                            }}
                        >
                            <div>
                                <CardMedia
                                    component='img'
                                    image={card.productImage}
                                    alt='random'
                                    sx={{ height: '15rem' }}
                                />
                                <CardContent sx={{ display: "flex",flexDirection: "column", alignItems: "center", width: "100%", marginTop: "6px", padding: "0px"}}>
                                    <Typography
                                        gutterBottom
                                        variant='h4'
                                        component='div'
                                        sx={{
                                            color: '#4E58B3',
                                            // px: "35%",
                                            fontSize: '24px',
                                            fontWeight: 'Bold',
                                        }}
                                    >
                                        {card.productName}
                                    </Typography>
                                    <Typography paragraph
                                        sx={{
                                       marginX:'18px'
                                      }}
                                  >
                                        {card.description}
                                    </Typography>

                                </CardContent>
                            </div>
                        </Card>
                    </Grid>
                 ))} 
            </Grid>
        </Box>
    );

}
