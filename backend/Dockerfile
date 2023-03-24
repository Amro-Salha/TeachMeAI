FROM python:3.9-alpine

RUN apk add --no-cache sqlite gcc musl-dev \
    && pip install --upgrade pip \
    && pip install -r requirements.txt

COPY . /app
WORKDIR /app

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
