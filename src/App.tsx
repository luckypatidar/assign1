import React,{useState} from 'react';
// import logo from './logo.svg';
import './App.css';
import DataTable from 'react-data-table-component';
import { CSVLink, CSVDownload } from "react-csv";

type columnType = { name: any; selector: any; }[];
type valueType = {
    firstname: string,
    email: string,
    lastname: string
}
type valueTypeBooks = {
    title: string ,
    isbn: string ,
    authors: string ,
    description: string
}
type valueTypeMagazines = {
    title: string,
    isbn: string,
    authors: string,
    publishedAt: string
}

function App() {
  const [ text, setText ] = useState('');
  const [append, setAppend] = useState(false);

  const [data, setData] = useState<valueType[]>([]);
  const [dataBooks, setDataBooks] = useState<valueTypeBooks[]>([]);
  const [dataMagazines, setDataMagazines] = useState<valueTypeMagazines[]>([]);

  const [columnData, setColumnData] = useState<columnType>([]);
  const [columnDataBooks, setColumnDataBooks] = useState<columnType>([]);
  const [columnDataMagazines, setColumnDataMagazines] = useState<columnType>([]);

  const [inputValue, setInputValue] = useState('');
  const [inputValueMagazines, setInputValueMagazines] = useState('');

  const [inputEmail, setInputEmail] = useState('');
  const [inputEmailMagazines, setInputEmailMagazines] = useState('');

  const [searchBooks, setSearchBooks] = useState<valueTypeBooks|null>(null);
  const [searchMagazines, setSearchMagazines] = useState<valueTypeMagazines|null>(null);

  const [searchBooksEmail, setSearchBooksEmail] = useState<valueTypeBooks[]|null>(null);
  const [searchMagazinesEmail, setSearchMagazinesEmail] = useState<valueTypeMagazines[]|null>(null);

  const [soretedBooks, setSortedBooks] = useState<valueTypeBooks[]>([]);
  

    const load = function(fileType:string){
        if(fileType==="author"){
            fetch( './authors.csv' )
                .then( response => response.text() )
                .then( responseText => {
                    processData(responseText);
                    return setText( responseText);
                })
        }
        if(fileType === 'books'){
            fetch( './books.csv' )
            .then( response => response.text() )
            .then( responseText => {
                processDataBooks(responseText);
                return setText( responseText);
            })
        }
        if(fileType === 'magazines'){
            fetch( './magazines.csv' )
            .then( response => response.text() )
            .then( responseText => {
                processDataMagazines(responseText);
                return setText( responseText);
            })
        }
    };
    const processData = (dataString: string) => {
        const dataStringLines = dataString.split(/\r\n|\n/);
        const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/)[0].split(';');
        console.log(dataStringLines.length);
     
        const list = [];
        for (let i = 1; i < dataStringLines.length; i++) {
          const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/)[0].split(';');
          if (headers && row.length === headers.length) {
            
            const obj :valueType = {
                email: '',
                firstname: '',
                lastname: ''
            };
            for (let j = 0; j < headers.length; j++) {
              let d = row[j];
              if (d.length > 0) {
                if (d[0] === '"')
                  d = d.substring(1, d.length - 1);
                if (d[d.length - 1] === '"')
                  d = d.substring(d.length - 2, 1);
              }
              if (headers[j]) {
                obj[headers[j] as keyof typeof obj] = d;
              }
            }
            list.push(obj);
            }
          }
          console.log(list);
        const columns = headers.map((c: any) => ({
          name: c,
          selector: c,
        }));
       
            setData(list);
            setColumnData(columns);
            
    }
    const processDataBooks = (dataString: string) => {
        const dataStringLines = dataString.split(/\r\n|\n/);
        const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/)[0].split(';');
        // console.log(dataStringLines);
        const list = [];
        for (let i = 1; i < dataStringLines.length; i++) {
          const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/)[0].split(';');
          if(row.length !== 1){
            if (headers) {
            
                const obj :valueTypeBooks = {
                    title: '',
                    isbn: '',
                    authors: '',
                    description: ''
                };
                for (let j = 0; j < headers?.length; j++) {
                  let d = row[j];
                  if (d?.length > 0) {
                    if (d[0] === '"')
                      d = d.substring(1, d?.length - 1);
                    if (d[d?.length - 1] === '"')
                      d = d.substring(d?.length - 2, 1);
                  }
                  if (headers[j]) {
                    obj[headers[j] as keyof typeof obj] = d;
                  }
                }
                list.push(obj);
                }
          }
        
          }
          console.log(list);
        const columns = headers.map((c: any) => ({
          name: c,
          selector: c,
        }));
       
            setDataBooks(list);
            setColumnDataBooks(columns);
            
    }
    const processDataMagazines = (dataString: string) => {
        const dataStringLines = dataString.split(/\r\n|\n/);
        const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/)[0].split(';');
        // console.log(dataStringLines);
        console.log(dataStringLines.length);
     
        const list = [];
        for (let i = 1; i < dataStringLines.length; i++) {
          const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/)[0].split(';');
          console.log(row.length)
          if(row.length !== 1){
            if (headers) {
            
                const obj :valueTypeMagazines = {
                    title: '',
                    isbn: '',
                    authors: '',
                    publishedAt: ''
                };
                for (let j = 0; j < headers?.length; j++) {
                  let d = row[j];
                  if (d?.length > 0) {
                    if (d[0] === '"')
                      d = d.substring(1, d?.length - 1);
                    if (d[d?.length - 1] === '"')
                      d = d.substring(d?.length - 2, 1);
                  }
                  if (headers[j]) {
                    obj[headers[j] as keyof typeof obj] = d;
                  }
                }
                list.push(obj);
                }
          }
          
          }
          console.log(list);
        
     
        // // prepare columns list from headers
        const columns = headers.map((c: any) => ({
          name: c,
          selector: c,
        }));
       
            setDataMagazines(list);
            setColumnDataMagazines(columns);
            
    }
    const searchBook= (data: string) => {
        const book = dataBooks?.filter((item)=> item.isbn === data)[0];
        setSearchBooks(book);
        // console.log(book);
    }
    const searchMagazine= (data: string) => {
        const book = dataMagazines?.filter((item)=> item.isbn === data)[0];
        setSearchMagazines(book);
        console.log(book);
    }
    const searchEmail= (data: string) => {
        const book = dataBooks?.filter((item)=> item.authors === data);
        setSearchBooksEmail(book);
        console.log(data,book);
    }
    const searchEmailMagazine= (data: string) => {
        const book = dataMagazines?.filter((item)=> item.authors === data);
        setSearchMagazinesEmail(book);
        console.log(book);
    }

    // console.log(dataBooks)

    function compare_to_sort(x: { title: number; },y: { title: number; }) {
        if (x.title < y.title)
            return -1;
        if (x.title > y.title)
            return 1;
        return 0;
    }

    const sortHere = () => {
        const db = dataBooks;
        const dm = dataMagazines;
        const mergedArr = Array.prototype.push.apply(db,dm);
        const sortedData = db?.sort((a, b) => (a?.title > b?.title) ? 1 : -1);
        setSortedBooks(sortedData);
        // console.log(db)
    }

    // const write = async (fields, data) => {
    //     // output file in the same folder
    //     const filename = fetch( './authors.csv' )
    //     .then( response => response.text() )
    //     .then( responseText => {
    //         processData(responseText);
    //         return setText( responseText);
    //     })
    //     let rows;
    //     // If file doesn't exist, we will create new file and add rows with headers.    
      
    //         // Rows without headers.
    //     rows = json2csv(data, { header: false });
        
    
    //     // Append file function can create new file too.
    //     fs.appendFileSync(filename, rows);
    //     // Always add new line if file already exists.
    //     fs.appendFileSync(filename, "\r\n");
    // }

    const appendHere = () => {
        let fields = ['title', 'isbn', 'authors','description'];
    let dataCheck = {
        title: 'The Immortals of Meluha',
        isbn: '2254--2222-5555',
        authors: 'Amish Tripathi',
        description: 'This is the description'
    };
    
    // write(fields,dataCheck);
    let csvdata = ([...dataBooks,dataCheck]);
    setDataBooks(csvdata);
    setAppend(true);
  
    }

    console.log(dataBooks)
   
    return (
        <div>
        <div style={{display:'flex',flexDirection:'row',alignItems:'center',marginTop: 20,justifyContent:'space-between'}}>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',maxWidth:'33%'}}>
            <button  onClick={()=> load('author') }>load Authors</button>
            {/* <h2>text:</h2> */}
            <DataTable
                pagination
                highlightOnHover
                columns={columnData}
                data={data}
            />
            </div>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',maxWidth:'33%'}}>
            <button  onClick={ ()=> load('books')  }>load books</button>
            {/* <h2>text:</h2> */}
            <DataTable
                pagination
                highlightOnHover
                columns={columnDataBooks}
                data={dataBooks}
            />
            </div>
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',maxWidth:'33%'}}>
            <button  onClick={ ()=> load('magazines')  }>load magazines</button>
            {/* <h2>text:</h2> */}
            <DataTable
                pagination
                highlightOnHover
                columns={columnDataMagazines}
                data={dataMagazines}
            />
            </div>
            </div>
            {/* Search Using ISBN */}
            <div style={{marginLeft: 40,display:'flex',justifyContent:'space-around',alignItems:'flex-start',flexDirection:'column'}}>
               <h3>Search using ISBN</h3>
                <div>
                <input type={'text'} onChange={(
                ev: React.ChangeEvent<HTMLInputElement>,
            ): void => setInputValue(ev.target.value)}
                placeholder='Search books using ISBN'
            />
             <button  onClick={()=> searchBook(inputValue)}>Search Book</button>
            {
                searchBooks ? 
                <DataTable
                pagination
                highlightOnHover
                columns={columnDataBooks}
                data={[searchBooks]}
            />
                : null
            }
           
            </div>
            <div>
                <input type={'text'} onChange={(
                ev: React.ChangeEvent<HTMLInputElement>,
            ): void => setInputValueMagazines(ev.target.value)}
                placeholder='Search magazines using ISBN'
            />
             <button  onClick={()=> searchMagazine(inputValueMagazines)}>Search Magazines</button>
             {
                searchMagazines ? 
                <DataTable
                pagination
                highlightOnHover
                columns={columnDataMagazines}
                data={[searchMagazines]}
            />
                : null
            }
            </div>
            </div>
            {/* Search Using Email  */}
            <div style={{marginLeft: 40,display:'flex',justifyContent:'space-around',alignItems:'flex-start',flexDirection:'column'}}>
               <h3>Search using email</h3>
                <div>
                <input type={'text'} onChange={(
                ev: React.ChangeEvent<HTMLInputElement>,
            ): void => setInputEmail(ev.target.value)}
                placeholder='Search books using email'
            />
             <button  onClick={()=> searchEmail(inputEmail)}>Search Book</button>
            {
                searchBooksEmail ? 
                <div >
                <DataTable
                pagination
                highlightOnHover
                columns={columnDataBooks}
                data={searchBooksEmail}
            />
            </div>
            
                : null
            }
           
            </div>
            <div>
                <input type={'text'} onChange={(
                ev: React.ChangeEvent<HTMLInputElement>,
            ): void => setInputEmailMagazines(ev.target.value)}
                placeholder='Search magazines using email'
            />
             <button  onClick={()=> searchEmailMagazine(inputEmailMagazines)}>Search Magazines</button>
             {
                searchMagazinesEmail ? 
                <DataTable
                pagination
                highlightOnHover
                columns={columnDataMagazines}
                data={searchMagazinesEmail}
            />
                : null
            }
            </div>
            </div>
            <div style={{marginTop:40,marginLeft:40}}>
               <h3>Sort the books according to title</h3>
             <button  onClick={()=> sortHere()}>Sort the books and Magazines</button>
             {
                soretedBooks ? 
                <div >
                <DataTable
                pagination
                highlightOnHover
                columns={columnDataBooks}
                data={soretedBooks}
            />
            </div>
            
                : null
            }
            </div>
            <div style={{marginLeft:40,marginBottom:40}}>
            <button  onClick={()=> appendHere()}>Append new line</button>
            {
                append ?              
                    <CSVDownload data={dataBooks} target="_blank" /> : null
                 
            }
            </div>
        </div>
    );
}

export default App;
function obj(obj: any) {
    throw new Error('Function not implemented.');
}

