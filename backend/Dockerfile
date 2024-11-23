FROM python:3.12
WORKDIR /app

COPY * ./
RUN pip install -r ./requirements.txt
RUN pip install gunicorn
ENV FLASK_ENV production CROSS_ORIGIN_ALLOW_URL "http://vcm-43401.vm.duke.edu"

# Do not use for now - doesn't work with CORS well
# ENV FLASK_APP app.py FLASK_DEBUG 0 FLASK_RUN_PORT 8000 

EXPOSE 8000
CMD ["gunicorn", "-b", ":8000", "app:app"]
