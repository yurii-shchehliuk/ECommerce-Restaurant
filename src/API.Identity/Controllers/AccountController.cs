using API.Identity.Dtos;
using API.Identity.Helpers;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApi.Domain.DTOs;
using WebApi.Domain.Entities.Identity;
using WebApi.Domain.Errors;
using WebApi.Domain.Interfaces.Services;

namespace API.Identity.Controllers
{
    public class AccountController : BaseApiController
    {
        public AccountController()
        {

        }

        [HttpPost]
        public async Task UploadPhotos()
        {

        }

        [HttpPut]
        public async Task ChangeName()
        {

        }

        [HttpPut]
        public async Task PhoneNumber()
        {

        }

        [HttpPut]
        public async Task Email()
        {

        }

        [HttpPut]
        public async Task Password()
        {

        }

        [HttpDelete]
        public async Task DeleteAccount()
        {

        }
    }
}