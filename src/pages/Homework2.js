import React from 'react';

class Homework2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bill: [
                { name: "apple", count: 5, price: 70 },
                { name: "orange", count: 10, price: 90 }
            ],
            result: 0,
            menuItems: ['Home', 'About', 'Contact'],
            paragraphText: 'This is some text in a paragraph.',
            searchValue: ''
        };
        this.date = new Date();
        console.log(this.date.toLocaleString());
        this.calculateTotal = this.calculateTotal.bind(this);
        this.copyMenuItems = this.copyMenuItems.bind(this);
        this.changeStyle = this.changeStyle.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleCountChange = this.handleCountChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
    }
    componentDidMount() {
        this.calculateTotal();
    }
    calculateTotal() {
        let total = 0;
        this.state.bill.forEach(item => {
            total += item.count * item.price;
        });
        console.log(`Total: ${total}`);
        this.setState({ result: total });
    }
    copyMenuItems() {
        let newText = this.state.paragraphText;
        this.state.menuItems.forEach(item => {
            newText += ` ${item}`;
        });
        this.setState({ paragraphText: newText });
    }
    changeStyle() {
        const elements = document.getElementsByClassName('change-style');
        for (let i = 0; i < elements.length; i++) {
            const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
            elements[i].style.color = randomColor;
        }
    }
    handleSearchChange(event) {
        this.setState({ searchValue: event.target.value });
    }
    handleCountChange(event, index) {
      const newBill = [...this.state.bill];
      newBill[index].count = event.target.value;
      this.setState({ bill: newBill }, () => {this.calculateTotal()});
    }
    handlePriceChange(event, index) {
      const newBill = [...this.state.bill];
      newBill[index].price = event.target.value;
      this.setState({ bill: newBill }, () => {this.calculateTotal()});
    }

    render() {
        return (
            <div>
                <h1>React.js and JSX Example</h1>
                <p>Date: {this.date.toLocaleString()}</p>
                <h2>Bill</h2>
                <ul>
                  {this.state.bill.map((item, index) => (
                      <li key={index}>
                          {item.name} - Count:
                          <input
                              type="number"
                              value={item.count}
                              onChange={event => this.handleCountChange(event, index)}
                          />
                          Price:
                          <input
                              type="number"
                              value={item.price}
                              onChange={event => this.handlePriceChange(event, index)}
                          />
                      </li>
                  ))}
              </ul>
              <p>Total: {this.state.result}</p>
                <h2>Menu</h2>
                <ul>
                    {this.state.menuItems.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
                <button onClick={this.copyMenuItems}>Copy Menu Items</button>
                <h2>Paragraph</h2>
                <p className="change-style">{this.state.paragraphText}</p>
                <button onClick={this.changeStyle}>Change Style</button>
                <h2>Search Menu Items</h2>
                <input type="text" value={this.state.searchValue} onChange={this.handleSearchChange} />
                <ul>
                    {this.state.menuItems.filter(item => item.toLowerCase().includes(this.state.searchValue.toLowerCase())).map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Homework2;