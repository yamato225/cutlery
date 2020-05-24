# IR services sequence

```sequence {theme="simple"}
"Process Waker"->"Process Waker": read\ninit.json
"Web Console"->"Process Waker": open
"Process Waker"->"sensor.py": wake
"Process Waker"->"sendor.py": wake
```








