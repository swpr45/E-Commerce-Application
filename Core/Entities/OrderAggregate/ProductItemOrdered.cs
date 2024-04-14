using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Entities.OrderAggregate
{
    
    public class ProductItemOrdered
    {
        public ProductItemOrdered()
        {
        }

        public ProductItemOrdered(int productitemId,string productName,string pictureUrl)
        {
            ProductItemId = productitemId;
            ProductName = productName;
            PictureUrl = pictureUrl;
        }

        public int ProductItemId{get;set;}
        public string ProductName { get; set; }
        public string PictureUrl { get; set; }

        private string GetDebuggerDisplay()
        {
            return ToString();
        }
    }
}