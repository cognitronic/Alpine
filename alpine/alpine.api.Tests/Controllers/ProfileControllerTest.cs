using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using alpine.api;
using alpine.api.Controllers;

namespace alpine.api.Tests.Controllers
{
    [TestClass]
    public class ProfileControllerTest
    {
        [TestMethod]
        public void Get()
        {
            // Arrange
            ProfileController controller = new ProfileController();

            // Act
            IEnumerable<string> result = controller.Get();

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(2, result.Count());
            Assert.AreEqual("value1", result.ElementAt(0));
            Assert.AreEqual("value2", result.ElementAt(1));
        }

        [TestMethod]
        public void GetById()
        {
            // Arrange
            ProfileController controller = new ProfileController();

            // Act
            string result = controller.Get(5);

            // Assert
            Assert.AreEqual("value", result);
        }

        [TestMethod]
        public void Post()
        {
            // Arrange
            ProfileController controller = new ProfileController();

            // Act
            controller.Post("value");

            // Assert
        }

        [TestMethod]
        public void Put()
        {
            // Arrange
            ProfileController controller = new ProfileController();

            // Act
            controller.Put(5, "value");

            // Assert
        }

        [TestMethod]
        public void Delete()
        {
            // Arrange
            ProfileController controller = new ProfileController();

            // Act
            controller.Delete(5);

            // Assert
        }
    }
}
