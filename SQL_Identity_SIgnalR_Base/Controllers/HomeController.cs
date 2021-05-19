using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SQL_Identity_SIgnalR_Base.Data;
using SQL_Identity_SIgnalR_Base.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace SQL_Identity_SIgnalR_Base.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private ApplicationDbContext _dbContext;

        public HomeController(ILogger<HomeController> logger, ApplicationDbContext applicationDbContext)
        {
            _logger = logger;
            this._dbContext = applicationDbContext;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Pictures()
        {
            List<string> baseStrings = _dbContext.Avatars.Select(o => o.ImageBase64).ToList();

            ViewBag.Pictures = baseStrings;

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public IActionResult UpLoadImage(string imageString)
        {
            Debug.WriteLine(imageString.Length);

            if (String.IsNullOrEmpty(imageString))
            {
                Debug.WriteLine($"Argument {nameof(imageString)} is null or empty");
                return Error();
            }

            this._dbContext.Avatars.Add(new Avatar()
            {
                ImageBase64 = imageString
            });

            this._dbContext.SaveChanges();

            return Ok();
        }
    }
}
