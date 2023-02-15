import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {Button} from '@mui/material'


export default function ProductList() {
    const [data, setData] = useState([])
    const data1 = [{
        productImage: "https://i.postimg.cc/Lst521y3/topGirls.jpg",
        productName: "Girls Top",
        description: "Lorem ipsum dolor sit amet. Id numquam sunt et tempora neque eum sunt rerum est explicabo dicta est iste accusantium"
    }, {
        productImage: "https://i.postimg.cc/B6ZS3wPJ/shirt.jpg",
        productName: "Shirt",
        description: "Lorem ipsum dolor sit amet. Id numquam sunt et tempora neque eum sunt rerum est explicabo dicta est iste accusantium"
    }, {
        productImage: "https://i.postimg.cc/dDPgsLNG/kurti.jpg",
        productName: "Kurti",
        description: "Lorem ipsum dolor sit amet. Id numquam sunt et tempora neque eum sunt rerum est explicabo dicta est iste accusantium"
    }, {
        productImage: "https://i.postimg.cc/brH4vq7M/jacket.png",
        productName: "Jacket",
        description: "Lorem ipsum dolor sit amet. Id numquam sunt et tempora neque eum sunt rerum est explicabo dicta est iste accusantium"
    }]
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
                style={{textDecoration: 'none'}}
                href='/'
            >
               {/* <Button id='back'>BACK</Button>*/}
            </a>
            <h1 style={{textAlign: "center"}}>Our Products</h1>
            <Grid container sx={{paddingLeft: "2rem", flexWrap: "wrap", flexDirection: "row", marginTop: '1.5rem'}}>
                {data1.map(card => (
                    <Grid item xs={4} sm={4} md={4} lg={3} sx={{marginTop: "40px"}}>
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
                                    sx={{height: '15rem'}}
                                />
                                <CardContent sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    width: "100%",
                                    marginTop: "6px",
                                    padding: "0px"
                                }}>
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
                                                    marginX: '18px'
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
