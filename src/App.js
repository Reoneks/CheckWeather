import React, { Component } from 'react';
import './App.css';
import { CsvToHtmlTable } from 'react-csv-to-table';
class App extends Component {
  getWeather(today){
    var unirest = require("unirest");
    return new Promise((resolve, reject) => {
      unirest("GET", "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/history")
        .query({
          "aggregateHours": "24",
          "combinationMethod": "aggregate",
          "startDateTime": today.toISOString().split(".")[0],
          "endDateTime": today.toISOString().split(".")[0],
          "maxStations": "-1",
          "maxDistance": "-1",
          "contentType": "csv",
          "unitGroup": "metric",
          "locationMode": "single",
          "key": "X1BRVW5GCLYUUD1YF224S7KTY",
          "dataElements": "default",
          "locations": this.state.value
        })
        .end(function (response) {
          if (response.error) return reject(response.error)
          return resolve(response.body);
        });
    })
  }
  handleClick() {
    var today = new Date(this.state.startDate);
    this.getWeather(today).then((body) => this.setState({csvData: body.split(", ").join(" ")})).catch((error) => console.log("error", error));
  }
  handleChange(event){
    this.setState({value: event.target.value});
  }
  constructor() { 
    super();
    this.state = { 
      value:"Vinnytsia,Vinnytsia",
      startDate: "2019-11-12"
    };
    this.handleClick = this.handleClick.bind(this); 
    this.handleChange = this.handleChange.bind(this);
  }   
  render() { 
    return (
      <div className = 'button_container'>
        <div className='form-row align-items-center data'>
          <div className='col-md-5'>
            <select value={this.state.value} onChange={this.handleChange} className="form-control mr-sm-2">
              <option value="Vinnytsia,Vinnytsia">Винница</option>  
              <option value="Lutsk,Volyn">Луцк</option>  
              <option value="Dnipro,Dnipropetrovsk">Днепр</option>
              <option value="Donetsk,Donetsk">Донецк</option>
              <option value="Zhytomyr,Zhytomyr">Житомир</option>
              <option value="Uzhhorod,Zakarpattia">Ужгород</option>
              <option value="Zaporozhye,Zaporizhia">Запорожье</option>
              <option value="Ivano-Frankivsk,Ivano-Frankivsk">Ивано-Франковск</option>
              <option value="Kiev">Киев</option>
              <option value="Kropyvnytskyi,Kirovohrad">Кропивницкий</option>
              <option value="Luhansk,Luhansk">Луганск</option>
              <option value="Lvov,Lviv">Львов</option>
              <option value="Nikolaev,Mykolaiv">Николаев</option>
              <option value="Odessa,Odessa">Одесса</option>
              <option value="Poltava,Poltava">Полтава</option>
              <option value="Rovno,Rivne">Ровно</option>
              <option value="Sumy,Sumy">Сумы</option>
              <option value="Ternopol,Ternopol">Тернополь</option>
              <option value="Kharkov,Kharkov">Харьков</option>
              <option value="Kherson,Kherson">Херсон</option>
              <option value="Khmelnytskyi,Khmelnytskyi">Хмельницкий</option>
              <option value="Cherkasy,Cherkasy">Черкассы</option>
              <option value="Chernigov,Chernihiv">Чернигов</option>
              <option value="Chernivtsi,Chernivtsi">Черновцы</option>
            </select>
          </div>
          <div className='col-md-2'>
            <input className="form-control" type="date" defaultValue="2019-11-12" onChange={(event) => this.setState({startDate: event.target.value})}/>
          </div>
          <div className='col-md-1'>
            <button type="button" className="btn btn-primary" onClick  = {this.handleClick}>Check the weather</button>
          </div>
        </div>
        <div className='weather'>
          <CsvToHtmlTable
                data={this.state.csvData}
                csvDelimiter=","
                tableClassName="table table-striped table-hover"
          />
        </div>
      </div>
    ) 
  }
} 
export default App;