using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using AutoMapper;
using Core.Entities.OrderAggregate;

namespace API.Helpers
{
    public class OrderItemResolver : IValueResolver<OrderItem, OrderItemDto, string>
    {
        private readonly IConfiguration _config ;
        public OrderItemResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(OrderItem source, OrderItemDto destination, string destMember, ResolutionContext context)
        {
            if(!string.IsNullOrEmpty(source.ItemOrdered.PictureUrl));
            {
                return _config["ApiUrl"]+source.ItemOrdered.PictureUrl;
            }
            return null;
        }
    }
}