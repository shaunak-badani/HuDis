FROM python:3.12
WORKDIR /app

COPY * ./
RUN pip install -r ./requirements.txt
RUN pip install gunicorn
ENV FLASK_ENV production

EXPOSE 8000
CMD ["gunicorn", "-b", ":8000", "app:app"]