using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace alpine.api.Controllers
{
    [RoutePrefix("api/profiles")]
    public class ProfileController : ApiController
    {
        // GET api/profile
        [Route("")]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/profile/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/profile
        public void Post([FromBody]string value)
        {
        }

        // PUT api/profile/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/profile/5
        public void Delete(int id)
        {
        }
    }
}
