import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./components/SearchResults/SearchResults";

export const BASE_URL = "http://localhost:9000";
const App = () => {
  const [data, setData] = useState(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);
  const [filteredData,setFilteredData]=useState(null);
  const [selectedBtn,setSelectedBtn]=useState("all");

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);
      try{
      const response = await fetch(BASE_URL);
      const json = await response.json();
      setLoading(false);
      setData(json);
      setFilteredData(json);
      console.log(json);
      }
      catch(error){
        setError("Unable to fetch data");
      }
    };

    fetchFoodData();
  }, []);
  const searchFood=(e)=>{
 const searchValue=e.target.value;
 if(searchValue==""){
  setFilteredData(data);
  return;
 }
 const filter=data?.filter((food)=>food.name.toLowerCase().includes(searchValue.toLowerCase()));
 setFilteredData(filter);
  };
  console.log(data);
  const temp=[
    {
        "name": "Boilded Egg",
        "price": 10,
        "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
        "image": "/images/egg.png",
        "type": "breakfast"
    }
    
];

const filterFood=(type)=>
{
  if(type=="all"){
    setFilteredData(data);
    setSelectedBtn("all");
    return;
  }

// }
const filter=data?.filter((food)=>food.type.toLowerCase().includes(type.toLowerCase()));
setFilteredData(filter);
setSelectedBtn(type);
  };

  const filterBtns=[
    {
      name:"All",
      type:"all"
    },
     {
      name:"Breakfast",
      type:"breakfast"
    },
     {
      name:"Lunch",
      type:"lunch"
    },
     {
      name:"Dinner",
      type:"dinner"
    },
  ];
  if(error) return <div>{error}</div>;
    if(loading) return <div>loading....</div>;
  return (
    <>
      <MainContainer>
        <TopContainer>
          <div className="logo">
            <img src="/logo.svg" alt="logo" />
          </div>
          <div className="search">
            <input type="text" onChange={searchFood} placeholder="Search Food " />
          </div>
        </TopContainer>
        <FilterContainer>
          {filterBtns.map((value)=>(
            <Button
            isSelected ={selectedBtn==value.type}
            key ={value.name} onClick={()=>filterFood(value.type)}>
              {value.name}
            </Button>
          ))}
          {/* <Button onClick={()=>filterFood("all")}>All</Button>
          <Button onClick={()=>filterFood("breakfast")}>Breakfast</Button>
          <Button onClick={()=>filterFood("lunch")}>Lunch</Button>
          <Button onClick={()=>filterFood("dinner")}>Dinner</Button> */}
        </FilterContainer>
      </MainContainer>
      <SearchResult data={filteredData} />
    </>
  );
};

export default App;

export const MainContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;
  .search{
  input{
  background-color: transparent;
  border: 1px solid red;
  color: white;
  border-radius: 5px;
  height: 40px;
  font-size: 16px;
  padding: 0 10px;
  &::placeholder{
  color:white;}
  }
  }
  @media(0<width<600px){
  flex-direction:column;
  height:120px;
  background-color:red;
  }`;

  const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-botton:40px`;

  export const Button = styled.button`
  background:${({isSelected})=>(isSelected? "green" : "#ff4343")};  
  outline: 1px solid ${({ isSelected }) => (isSelected ? "white" : "#ff4343")};

  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor:pointer;
  &:hover{
  background-color:#f22f2f;}
  `;

 