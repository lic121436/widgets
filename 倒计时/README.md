### describe
```
new CountDown()
```

### query 
```
obj is object => new CountDown(obj)
```

### Attributes of parameter obj
```
id: Node position to render => document.getElementById(XXX)

totalTime: Initialization countdown, String type, format 00:00:00, default value 24:00:00 

hourMax: When does an hour start after a specified number of minutes and seconds to zero, String type, default value 24

minuteMax: When does the minute start after the specified number of seconds to zero, String type, default value 60

secondMax: When to start counting down after the specified number of seconds to zero, String type, default value 60

endTimeFn: Execute callback function (00:00:00), function type, default value null after countdown is completed

loopTime: Whether to count back after 00:00:00, Boolean type, default value false, no cycle, only count back once

parseTime: Whether to format 00:00:00, Boolean type, default value false, not formatted, the format is 00:00:00, after formatting, the format is 0 days, 0 hours and 0 minutes.

appointTimeList: Execute callback function at specified time, Array type, attribute {time: 00:00:00, fn: null}, time is specified time, FN is specified time callback function, callback parameter is current specified time, default value []
```

### example
```
<html>
  <div class="box" id="box"></div>
</html>
<script>
  new CountDown({
    id: document.getElementById('box'),
    loopTime: true,
    totalTime: '23:11:11',
    hourMax: '10',
    minuteMax: '10',
    secondMax: '50',
    parseTime: true,
    endTimeFn: () => {
				console.log("I'm done with it.")
		},
    appointTimeList: [
      { time: '23:00:08', fn: (res) => {console.log(`I am the time specified by ${res}`)} },
    ]
  })
</script>
```