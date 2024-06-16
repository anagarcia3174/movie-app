import React from 'react'
import Banner from '../components/Banner'
import Row from '../components/Row'
import '../components/styles.css'

import NavbarComponent from '../components/NavbarComponent'


function HomeScreen() {



  return (
    <div className='bg-dark vh-100'>
      <NavbarComponent />
      <Banner />
      <Row title="Action" />
      <Row title="Comedy" />
      <Row title="Fantasy" />
      <Row title="Horror" />
      <Row title="Romance" />
      <Row title="Documentary"/>


    </div>
  )
}

export default HomeScreen