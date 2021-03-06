import { h, Component } from 'preact';
import style from './style.less';
import { months, monthsShort, dayArr } from './dates'
/**@jsx h*/

class DatePicker extends Component {
  
  closeDatePicker() {
		this.props.closeFunction(); // Function gets passed by parent
	}
  
  /**
  * Gets fired when a day gets clicked.
  * @param {object} e The event thrown by the <span /> element clicked
  */
	dayClicked(e) {
    
    const element = e.target; // the actual element clicked
 
		if (element.innerHTML === '') return false; // don't continue if <span /> empty
    
    // get date from clicked element (gets attached when rendered)
		const date = new Date(element.getAttribute('date'));
    
    // update the state
	  this.setState({ currentDate: date });
	}
  
  /**
  * returns days in month as array
  * @param {number} month the month to display
  * @param {number} year the year to display
  */
  getDaysByMonth(month, year) {
    
    let calendar = [];
    
    const date = new Date(year, month, 1); // month to display
    
    const firstDay = new Date(year, month, 1).getDay(); // first weekday of month
    const lastDate = new Date(year, month + 1, 0).getDate(); // last date of month
    
    let day = 0;
    
    // the calendar is 7*6 fields big, so 42 loops
    for (let i = 0; i < 42; i++) {
      
      if (i >= firstDay && day !== null) day = day + 1;
      if (day > lastDate) day = null;
      
      // append the calendar Array
      calendar.push({
        day: (day === 0 || day === null) ? null : day, // null or number
        date: (day === 0 || day === null) ? null : new Date(year, month, day), // null or Date()
        today: (day === this.now.getDate() && month === this.now.getMonth() && year === this.now.getFullYear()) // boolean
      });
    }
    
    return calendar;
  }
  
  /**
  * Display previous month by updating state
  */
  displayPrevMonth() {
    if (this.state.displayedMonth <= 0) {
      this.setState({
        displayedMonth: 11,
        displayedYear: this.state.displayedYear - 1
      });
    }
    else {
      this.setState({
        displayedMonth: this.state.displayedMonth - 1
      });
    }
  }
  
  /**
  * Display next month by updating state
  */
  displayNextMonth() {
    if (this.state.displayedMonth >= 11) {
      this.setState({
        displayedMonth: 0,
        displayedYear: this.state.displayedYear + 1
      });
    }
    else {
      this.setState({
        displayedMonth: this.state.displayedMonth + 1
      });
    }
  }
  
  /**
  * Display the selected month (gets fired when clicking on the date string)
  */
  displaySelectedMonth() {
    if (this.state.selectYearMode) {
      this.toggleYearSelector();
    }
    else {
      if (!this.state.currentDate) return false;
      this.setState({
        displayedMonth: this.state.currentDate.getMonth(),
        displayedYear: this.state.currentDate.getFullYear()
      });
    }
  }
  
  toggleYearSelector() {
    this.setState({ selectYearMode: !this.state.selectYearMode });
  }
  
  changeDisplayedYear(e) {
    const element = e.target;
    this.toggleYearSelector();
    this.setState({ displayedYear: parseInt(element.innerHTML, 10), displayedMonth: 0 });
  }
  
  /**
  * Pass the selected date to parent when 'OK' is clicked
  */
  passDateToParent() {
    this.props.dateReciever(this.state.currentDate);
    this.closeDatePicker();
  }
  
  componentDidUpdate() {
    if (this.state.selectYearMode) {
      document.getElementsByClassName('selected')[0].scrollIntoView(); // works in every browser incl. IE, replace with scrollIntoViewIfNeeded when browsers support it
    }
  }
  
  constructor(props) {
    super(props);
    
    this.closeDatePicker = this.closeDatePicker.bind(this);
		this.dayClicked = this.dayClicked.bind(this);
    this.displayNextMonth = this.displayNextMonth.bind(this);
    this.displayPrevMonth = this.displayPrevMonth.bind(this);
    this.getDaysByMonth = this.getDaysByMonth.bind(this);
    this.changeDisplayedYear = this.changeDisplayedYear.bind(this);
    this.passDateToParent = this.passDateToParent.bind(this);
    this.toggleYearSelector = this.toggleYearSelector.bind(this);
    this.displaySelectedMonth = this.displaySelectedMonth.bind(this);
    
    this.monthArrShortFull = months;
    this.monthArrShort = monthsShort
    
    this.dayArr = dayArr;
    
    this.now = new Date()
    
    this.yearArr = []
    
    for (let i = 1970; i <= this.now.getFullYear() + 30; i++) {
      this.yearArr.push(i);
    }
    
    this.state = {
      currentDate: this.now,
      displayedMonth: this.now.getMonth(),
      displayedYear: this.now.getFullYear(),
      selectYearMode: false
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props.activeDate!==nextProps.activeDate){
      console.log('componentWillReceiveProps:',nextProps.activeDate);

      this.setState({
        currentDate: this.now,
        displayedMonth: this.now.getMonth(),
        displayedYear: this.now.getFullYear(),
        selectYearMode: false
      })
    }
  }
  
  render({ opened }) {
    const { activeDate } = this.props;
    if(activeDate){
      console.log('activeDate:',activeDate);
    }
    
    const { currentDate, displayedMonth, displayedYear, selectYearMode } = this.state;
    const openClass = opened? style['datePicker--opened'] : '';
    return (
      <div>
				<div class={`${style.datePicker} ${openClass}`} >
					<div className={style['datePicker--titles']}>
					  <h3 style={{
                color: selectYearMode ? 'rgba(255,255,255,.87)' : 'rgba(255,255,255,.57)'
              }} onClick={this.toggleYearSelector}>{currentDate.getFullYear()}</h3>
						<h2 style={{
                color: !selectYearMode ? 'rgba(255,255,255,.87)' : 'rgba(255,255,255,.57)'
              }} onClick={this.displaySelectedMonth}>
              {this.dayArr[currentDate.getDay()]}, {this.monthArrShort[currentDate.getMonth()]} {currentDate.getDate()}
            </h2>
					</div>

					{!selectYearMode && <nav>
						<i onClick={this.displayPrevMonth} className={`${style['material-icons']} material-icons`}>&#xE314;</i>
						<h4>{this.monthArrShortFull[displayedMonth]} {displayedYear}</h4>
						<i onClick={this.displayNextMonth} className={`${style['material-icons']} material-icons`}>&#xE315;</i>
					</nav>}
          
          <div className={style['datePicker--scroll']}>
            {!selectYearMode && <div className={style['datePicker--calendar']} >
              <div class={style['datePicker--dayNames']}>
                {['S','M','T','W','T','F','S'].map(day => <span>{day}</span>)}
              </div>
              <div onClick={this.dayClicked} class={style['datePicker--days']}>
                {this.getDaysByMonth(this.state.displayedMonth, this.state.displayedYear)
                  .map(
                    day => {
                      let selected = false;
                      if (currentDate && day.date) selected = (currentDate.toLocaleDateString() === day.date.toLocaleDateString());
                      
                      return (<span
                        class={(day.today ? style['datePicker--today'] : '') + (selected ? style['datePicker--selected'] : '')}
                        disabled={!day.date}
                        date={day.date}
                       >
                        {day.day}
                      </span>)
                    }
                  )
                }
              </div>
            </div>}
            {selectYearMode && <div class={style['datePicker--selectYear']}>
              {this.yearArr.map(year => (
                <span class={(year === displayedYear) ? 'selected' : ''} onClick={this.changeDisplayedYear}>
                  {year}
                </span>
              ))}
            </div>}
            
            {!selectYearMode && <div className={style['datePicker--actions']}>
              <button onClick={this.closeDatePicker}>CANCEL</button>
              <button onClick={this.passDateToParent}>OK</button>
            </div>}
            
          </div>
				</div>
				<div className={style['datePicker--background']} onClick={this.closeDatePicker} style={{
					display: opened ? 'block' : 'none'
				}}
				/>
        
			</div>
    )
  }
}


export default DatePicker;