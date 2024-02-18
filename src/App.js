import { Component } from "react"; 
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
 
  ResponsiveContainer,
  Bar,
} from 'recharts'
import './App.css' 


const monthsArray=['Jan','Feb','Mar','April','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

class App extends Component{
  state={
   data:[],
    limit:"10", 
    pieData:[],
    offset:"0",
    search_input:"",
    monthName:monthsArray[2], 
    barData:[],
    
  }

 

  componentDidMount(){
    this.fetchData()
  }

  fetchData=async()=>{ 
    let monthNumber; 
    
    const {offset,limit,search_input,monthName}=this.state 

switch (monthName) {

    case "Jan":
      monthNumber = 0;
      break;
    case "Feb":
      monthNumber = 1;
      break;
    case "Mar":
        monthNumber = 2;
        break;
    case "April":
        monthNumber = 3;
        break;
    case "May":
        monthNumber = 4;
        break;
    case "Jun":
        monthNumber = 5;
        break;
    case "Jul":
        monthNumber = 6;
        break;
    case "Aug":
        monthNumber = 7;
        break;
    case "Sep":
        monthNumber = 8;
        break;
    case "Oct":
        monthNumber = 9;
        break;
    case "Nov":
        monthNumber = 10;
        break;
    case "Dec":
        monthNumber = 11;
        break;
   }


try{
  const options={
    method:"GET",
  }
      
    
    const url=`https://rox-backend.onrender.com/trans/?offset=${offset}&limit=${limit}&search_q=${search_input}&category=${monthNumber}`
    const barUrl=`https://rox-backend.onrender.com/trans/barchart/${monthNumber}`  
    const pieUrl=`https://rox-backend.onrender.com/trans/piechart/${monthNumber}`
    const options1={
  method:'GET',
}  

const options2={
  method:'GET',
}
    const barResponse=await fetch(barUrl,options1) 
    const barDataa=await barResponse.json()  
    const pieResponse=await fetch(pieUrl,options2) 
    const pieDataa=await pieResponse.json()


  
    
  
        
  const res=await fetch(url,options) 
  const dataa=await res.json()  
  console.log(dataa,"done")
  
  this.setState({data:dataa,barData:barDataa,pieData:pieDataa})
}catch(e){
  console.log(e)
}
    
  }

increment=()=>{
  this.setState(prevState=>({limit:(prevState.limit),offset:(prevState.limit)}),this.fetchData)
}


decrement=()=>{
 
  this.setState(prevState=>({limit:(prevState.limit),offset:(parseInt(prevState.limit)-10).toString()}),this.fetchData)

  
}
  changeCategory=e=>{
    this.setState({ monthName:e.target.value},this.fetchData)
  }

  changeSearch=e=>{
    this.setState({search_input:e.target.value},this.fetchData)
  }

renderStats=()=>{
  const {data}=this.state 

  let totalSale=0;
  let soldItems=0;
  let unsoldItems=0; 

  data.forEach(eachProduct=>(
    totalSale+=parseInt(eachProduct.price),
    soldItems+=eachProduct.sold===1?1:0,
    unsoldItems+=eachProduct.sold===0?1:0
    

     



    
  ))

  return(
   <div >
    <h1 className="Sales-item">Total Statistics</h1>
    <h1 className="Sale-item">Total Sale : <span className="sold">{totalSale}</span></h1> 
    <h1 className="Sale-item">Total Sold Items : <span className="sold">{soldItems}</span></h1> 
    <h1 className="Sale-item">Total not sold Items : <span className="sold">{unsoldItems}</span></h1>

   </div>


 
  )

}
 
/*

  renderTable=()=>{
    
   const {data}=this.state
    return (
     <className>
      <ul className="unordered-column">
        <li className="table-header">
          <p className="column-id">ID</p>
          <p className="column-title">Title</p>
          <p className="column-des">Description</p>
          <p className="column-price">Price</p>
          <p className="column-category"> Category</p>
          <p className="column-sold">Sold</p> 
          <p className="column-image">Image</p>
        </li>  
        
       
        </ul>
      
        <ul className="unordered-column">
           
      {data.map((eachData)=>(

        <li key={eachData.id} className="table-headerr">
          <p className="column-id">{eachData.id}</p>
          <p className="column-title">{eachData.title}</p>
          <p className="column-des">{eachData.description}</p>
          <p className="column-price">{eachData.price}</p>
          <p className="column-category">{eachData.category}</p>
          <p className="column-sold">{eachData.sold}</p> 
          <div className="column-image">
          <img className="image" src={eachData.image} />
          </div>
        
        </li>
       
  ))}
 </ul>
        
    </className>
     

     
    )
  } */ 


  renderTable=()=>{


    const {data}=this.state
    return(
      <div
      className="state-wise-stats-container"
      testid="stateWiseCovidDataTable"
    >
      <div className="state-wise-states-table">
        <div className="table-header">
          <div >
            <p className="column-id">Id</p>
           
          
          </div>
          
            <p className="column-title">title</p>
          
      
            <p className="column-des">Description</p>
        
        
            <p className="column-price">Price</p>
         
          
            <p className="column-category">Category</p>
        
         
            <p className="column-sold">Sold</p>
         
         
            <p className="column-image">Image</p>
        
        <div/>
        </div>
        <div className="state-wise-data-container">
          <ul className="other-tables">
          {data.map((eachData)=>(

<li key={eachData.id} className="table-headerr">
  <p className="column-id">{eachData.id}</p>
  <p className="column-title">{eachData.title}</p>
  <p className="column-des">{eachData.description}</p>
  <p className="column-price">{eachData.price}</p>
  <p className="column-category">{eachData.category}</p>
  <p className="column-sold">{eachData.sold}</p> 
  <div className="column-image">
  <img className="image" src={eachData.image} />
  </div>

</li>

))}
          </ul>
        </div>
    
    </div> 
    </div>
    )
  }

  


  renderBarChart=()=>{  
    const {barData}=this.state 
    console.log(barData)

    

   
    return(
     
   <div className="chart-con">
  
      <ResponsiveContainer width="50%" aspect={3}>
      <h1 className="Sales-item">Bar Chart</h1>
      <BarChart data={barData} width={400} height={400}> 
      
      <XAxis dataKey="price_range" /> 
      <YAxis />
        <Bar dataKey="item_count" fill="#5EFFF3"  />
      </BarChart>
     </ResponsiveContainer>
   </div>

    
         )
  }

  renderPieChart=()=>{
    const {pieData}=this.state  
   
   



    console.log(pieData)
    return(
    
      <div className="chart-con"> 
        <h1 className="Sales-item">Pie Chart</h1>
         <PieChart width={400} height={400}>
      
          <Pie
            dataKey="itemCount"
            isAnimationActive={false}
            data={pieData}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            label
          />
          
          <Tooltip />
        </PieChart>
  
      </div>
    )
  }

  render(){
    const {search,category,limit,offset}=this.state 
    console.log(offset,limit)

    return(
      <div className="container">
        <div className="search-category-container">
          <input type="search" placeholder="Search Items..." className="search-container" onChange={this.changeSearch} value={search} /> 
          <select type="option" value={category} className="dropdown-container" onChange={this.changeCategory} >
            {monthsArray.map(eachMonth=>(
              <option value={eachMonth} key={eachMonth} >{eachMonth}</option>
            ))}
          </select>

        </div>
        <div className="table-container">
        {this.renderTable()}

        </div> 
        <div className="pagination-container"> 
        <button type="button" onClick={this.decrement}>Previous</button> 
        <button type="button" onClick={this.increment}>Next</button>

        </div> 
        <div className="charts-con">
          {this.renderStats()}
        </div> 
        <div >
          {this.renderBarChart()} 
          {this.renderPieChart()}
        </div> 
      </div>
    )
  }


}



export default App