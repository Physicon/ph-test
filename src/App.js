import React, { Component } from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Item from "./components/Item/";
import ListItems from './components/ListItems/';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isGoing: false,
      strSearch: '',
      subject: null,
      genre: null,
      grade: null
    };
  }

 componentDidMount() {
    fetch('http://krapipl.imumk.ru:8082/api/mobilev1/update', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'data':''})
    })
      .then(response => response.json())
      .then(data => this.setState({ items: data.items }));
  }

  onChangeSubject = (event) => {
    this.setState({subject: event.target.value});
  }

  onChangeGenre = (event) => {
    this.setState({genre: event.target.value});
  }

  onChangeGrade = (event) => {
    this.setState({grade: event.target.value});
  }

  onSubmitSearch = (value) => {
    if(this.inputRef) {
      this.setState({strSearch: this.inputRef.value.toLowerCase()});
    }
  }

  onChangePrice = () => {
    this.setState({isGoing: !this.state.isGoing})
  }

  render() {
    let items = this.state.items;
    let strSearch = this.state.strSearch;

    if(this.state.subject || this.state.genre || this.state.grade || (strSearch && strSearch.length > 0) )  {
      items = items.filter(item => {
        let condition = true;
        if(this.state.subject) {
          condition = item.subject === this.state.subject
        }
        if(this.state.genre) {
          condition = condition && item.genre === this.state.genre
        }
        if(this.state.grade) {
          condition = condition && item.grade === this.state.grade
        }
        if(strSearch && strSearch.length > 0) {
          condition = condition && (item.genre.toLowerCase().includes(strSearch) || item.grade.toLowerCase().includes(strSearch) || item.subject.toLowerCase().includes(strSearch))
        }
        return condition
     })
    }

    return (
      <React.Fragment>
        <h1 className="u-text-center">Витрина</h1>
        <div className="courses u-mt-30">
            <div>
              <select onChange={this.onChangeSubject}>
                  <option value="">Все предметы</option>
                  <option value="Алгебра">Алгебра</option>
                  <option value="Английский язык">Английский язык</option>
                  <option value="Биология">Биология</option>
                  <option value="География">География</option>
                  <option value="Геометрия">Геометрия</option>
                  <option value="Демо-версия">Демо-версия</option>
                  <option value="Информатика">Информатика</option>
                  <option value="История">История</option>
                  <option value="Литература">Литература</option>
                  <option value="Математика">Математика</option>
                  <option value="Обществознание">Обществознание</option>
                  <option value="Окружающий мир">Окружающий мир</option>
                  <option value="Робототехника">Робототехника</option>
                  <option value="Русский язык">Русский язык</option>
                  <option value="Физика">Физика</option>
                  <option value="Химия">Химия</option>
              </select>
            </div>
            <div>
              <select onChange={this.onChangeGenre}>
                  <option value="">Все жанры</option>
                  <option value="Демо">Демо</option>
                  <option value="Задачник">Задачник</option>
                  <option value="Подготовка к ВПР">Подготовка к ВПР</option>
                  <option value="Подготовка к ЕГЭ">Подготовка к ЕГЭ</option>
                  <option value="Рабочая тетрадь">Рабочая тетрадь</option>
              </select>
            </div>
            <div>
              <select onChange={this.onChangeGrade}>
                  <option value="">Все классы</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
              </select>
            </div>
            <div>
                  <input className="borderFind" type="text" placeholder="Поиск" ref={element => this.inputRef = element}/>
                  <button className="courses-form-search-btn" type="submit" title="Найти" onClick={this.onSubmitSearch}></button>
            </div>
        </div>
        <div className="div-checkbox">
          <p><input
          name="check"
          type="checkbox"
          checked={this.state.isGoing}
          onChange={this.onChangePrice} /> бонусы</p>
        </div>


        <div className="App">
            {(this.state.items.length > 0) ? 
              <ul className="courses-list">
                <ListItems items={items} cheked={this.state.isGoing}/>
              </ul>
              : 
              <div>error loaded</div>}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
