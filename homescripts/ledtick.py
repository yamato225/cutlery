import RPi.GPIO as GPIO
from time import sleep
import signal

import signal
import sys
def handler(signal, frame):
	GPIO.cleanup()
	sys.exit(0)

signal.signal(signal.SIGINT, handler)

GPIO.setmode(GPIO.BOARD)
GPIO.setup(33, GPIO.OUT)

GPIO.output(33, GPIO.HIGH)

while True:
	sleep(0.2)
	GPIO.output(33, GPIO.LOW)
	sleep(0.2)
	GPIO.output(33, GPIO.HIGH)

exit()
