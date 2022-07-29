from website import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True, host='172.16.72.175', port=5000)
