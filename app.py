import web
import hbase
import json
render = web.template.render('templates/')

urls = (
    '/','index',
    '/upload','upload',
    '/dump','dump'
)


class index:
    def GET(self):
        row = b'test'
        data =hbase.getFromHbase(row)
        cols = []
        for key in data.keys():
            cols.append(key.decode('utf-8'))
        cols.remove('cf:counter')
        return render.index(cols)

class upload:
    def GET(self):
        return render.upload()
    
    def POST(self):
        data = web.data()
        row = b"test"
        hbase.uploadToHbase(row,data)
        return 'success'

class dump:
    def GET(self):
        
        i=web.input(row='test',col='')
        data=hbase.getFromHbase(i.row.encode('utf-8'))
        if(len(data)>0 and not i.col==''):
            return data[i.col.encode('utf-8')]
        else:
            return "there is no such file in row:"+i.row+" col:"+i.col


if __name__ == "__main__":
    app = web.application(urls,globals())
    app.run()