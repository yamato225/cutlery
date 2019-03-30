import RPi.GPIO as GPIO
from time import sleep
import signal

import signal

GPIO.setmode(GPIO.BOARD)
GPIO.setup(33, GPIO.OUT)

GPIO.output(33, GPIO.HIGH)

GPIO.cleanup()

exit()
