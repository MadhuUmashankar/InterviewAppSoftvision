import React, { Component } from 'react';

export default class HelpIconTable extends Component {
  render(){
    return(
      <div>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Area of Expertise</th>
            <th>Junior Minimum</th>
            <th>Mid Minimum</th>
            <th>Senior Minimum</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>OOP, Design Patterns, Architecture, General</td>
            <td>2</td>
            <td>4</td>
            <td>7</td>
          </tr>
          <tr>
            <td>HTTP</td>
            <td>2</td>
            <td>4</td>
            <td>7</td>
          </tr>
          <tr>
            <td>HTML</td>
            <td>3</td>
            <td>5</td>
            <td>8</td>
          </tr>
          <tr>
            <td>CSS</td>
            <td>3</td>
            <td>5</td>
            <td>7</td>
          </tr>
          <tr>
            <td>Git</td>
            <td>2</td>
            <td>4</td>
            <td>7</td>
          </tr>
          <tr>
            <td>Javascript</td>
            <td>3</td>
            <td>5</td>
            <td>8</td>
          </tr>
          <tr>
            <td>Node. Js</td>
            <td>2</td>
            <td>4</td>
            <td>7</td>
          </tr>
          <tr>
            <td>PHP</td>
            <td>2</td>
            <td>4</td>
            <td>7</td>
          </tr>
          <tr>
            <td>Databases</td>
            <td>3</td>
            <td>5</td>
            <td>8</td>
          </tr>
          <tr>
            <td>Ruby</td>
            <td>2</td>
            <td>4</td>
            <td>7</td>
          </tr>
          <tr>
            <td>Ruby on Rails</td>
            <td>2</td>
            <td>4</td>
            <td>7</td>
          </tr>
          <tr>
            <td>Python</td>
            <td>3</td>
            <td>5</td>
            <td>8</td>
          </tr>
        </tbody>
      </table>
      </div>
    )
  }
}
