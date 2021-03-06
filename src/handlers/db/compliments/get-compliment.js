const pool = require('../config')
/* 
expected body:
    {
        user: {
            username: String
        }
    }
*/
/**
 * Gets a compliment by calling a plsql function to take
 *      in a username and get a random compliment for that user.
 * @param event 
 * @param context 
 * @returns A string for the compliment.
 */
exports.handler = async (event, context) => {

  const { user } = event.body;
  const query = {
    text: "select getComplimentByUsername($1)",
    values: [user.username],
    rowMode: 'array'
  };
  const res = await pool().query(query);
  event.result.body = {
    compliment: res.rows[0][0]
  }
  return event;

};
