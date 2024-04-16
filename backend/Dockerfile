FROM python:3.11.5-alpine3.18

COPY ./req.txt /temp/req.txt
COPY . /
WORKDIR /backend
EXPOSE 8000


RUN apk add --no-cache postgresql-client build-base postgresql-dev \
    && pip install -r /temp/req.txt \
    && adduser --disabled-password admin-user

USER admin-user

CMD ["daphne", "config.asgi:application", "--bind", "0.0.0.0", "--port", "8000"]
