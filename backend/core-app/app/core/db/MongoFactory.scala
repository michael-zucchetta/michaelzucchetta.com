package core.db; 

import com.mongodb.casbah.MongoCollection
import com.mongodb.casbah.MongoConnection

object MongoFactory {
    private val SERVER = "localhost"
    private val PORT   = 27017
    private val DATABASE = "michaelzucchetta"
    val connection = MongoConnection(SERVER, PORT)
    // val collection = connection(DATABASE)(COLLECTION)
    
    def getConnection(): MongoConnection = {
      return connection;
    }
    
    def getCollection(collectionName: String): MongoCollection = {
      return this.connection(DATABASE)(collectionName);
    }

    def getString(): String = {
      return "Hola!";
    }
}
